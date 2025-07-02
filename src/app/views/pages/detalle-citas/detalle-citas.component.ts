import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@siemens/ngx-datatable';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CitasService } from '../../../service/citas.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-detalle-citas',
  imports: [NgxDatatableModule, CommonModule, RouterModule, FormsModule,
    ReactiveFormsModule, NgbTooltipModule, FullCalendarModule],
  templateUrl: './detalle-citas.component.html',
  styleUrl: './detalle-citas.component.scss'
})
export class DetalleCitasComponent {
  formModal: FormGroup;
  public _citasService = inject(CitasService);
  originalData: any[] = [];
  temp: any[] = [];
  rows: any[] = [];
  page: number = 0;
  pageSize: number = 10;
  filteredCount: number = 0;
  loading: boolean = true;
  personaSeleccionada: any = null;
  modalRef: NgbModalRef;

  formCitas: FormGroup;
  showModal = false;
  selectedDate: Date | null = null;
  fechaFormat: any;
  selectedHour: string = '';
  fechaSeleccionada: any;
  horaSeleccionada: string = '';
  mensajeDisponibilidad: string = '';
  numeroLugares: number = 0;
  currentUser: any;
  banderaCita: number = 0;

  viewState: 'lista' | 'enviar-link' | 'atender' = 'lista';
  selectedRow: any = null;

  @ViewChild('table') table: DatatableComponent;
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  @ViewChild('xlModal', { static: true }) xlModal!: TemplateRef<any>;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.formModal = this.fb.group({
      textLink: [''],
      descripcion: ['']
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    locale: 'es',
    dateClick: this.onDateClick.bind(this),
    dayCellDidMount: (info) => {
      const today = new Date();
      const cellDate = info.date;

      if (cellDate < new Date(today.setHours(0, 0, 0, 0))) {
        info.el.classList.add('fc-past-day');
      }
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'Lista'
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };

  ngOnInit(): void {
    //this.getCitas()
  }

  onDateClick(arg: DateClickArg) {
    const today = new Date();
    console.log(today)
    const clickedDate = arg.date;
    if (clickedDate < new Date(today.setHours(0, 0, 0, 0))) {
      return;
    }
    this.selectedDate = clickedDate;
    this.fechaSeleccionada = clickedDate;
    const year = clickedDate.getFullYear();
    const month = String(clickedDate.getMonth() + 1).padStart(2, '0'); // Mes va de 0 a 11
    const day = String(clickedDate.getDate()).padStart(2, '0');

    this.fechaFormat = `${year}-${month}-${day}`;
    console.log(this.fechaFormat )
    this._citasService.getCitas(this.fechaFormat).subscribe({
      next: (response: any) => {
        this.originalData = [...response.citas];
        this.temp = [...this.originalData];
        this.filteredCount = this.temp.length;
        this.setPage({ offset: 0 });
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });
    this.abrirModal(1)
  }

  verEnviarLink(row: any) {
    this.selectedRow = row;
    this.viewState = 'enviar-link';
  }

  /*getCitas() {
    this._citasService.getCitas("1").subscribe({
      next: (response: any) => {
        this.originalData = [...response.citas];
        this.temp = [...this.originalData];
        this.filteredCount = this.temp.length;
        this.setPage({ offset: 0 });
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });
  }*/
  setPage(pageInfo: any) {
    this.page = pageInfo.offset;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.temp.slice(start, end);
  }

  updateFilter(event: any) {
    const val = (event.target?.value || '').toLowerCase();
    this.temp = this.originalData.filter((row: any) => {
      return Object.values(row).some((field) => {
        return field && field.toString().toLowerCase().includes(val);
      });
    });

    this.filteredCount = this.temp.length;
    this.setPage({ offset: 0 });
  } 


  enviarDatos(datos: any): void {
    if (this.formModal.value.textLink == '' || this.formModal.value.descripcion == '') {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "¡Atención!",
        text: `Debe llenar los campos.`,
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      const data = {
        enlace: this.formModal.value.textLink,
        texto: this.formModal.value.descripcion,
        rfc: datos.rfc,
        citaid: datos.id
      }
      console.log(data)
      this._citasService.sendMsg(data).subscribe({
        next: (response: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Correcto!",
            text: `Correo enviado correctamente.`,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              if (this.modalRef) {
                this.modalRef.close('');
              }
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });
            } else if (result.isDenied) {
            }
          });
        },
        error: (e: HttpErrorResponse) => {
          const msg = e.error?.msg || 'Error desconocido';
          console.error('Error del servidor:', msg);
        }
      });
    }
  }

  sendAtendido(persona: any) {
    const id = persona.id;
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '¿Está seguro?',
      text: 'Se marcará como atendido',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'swal2-confirm btn btn-success me-2',
        denyButton: 'swal2-cancel btn btn-warning'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._citasService.atendercita(id).subscribe({
          next: (response: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "¡Correcto!",
              text: `Se marcó como atendido.`,
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                const currentUrl = this.router.url;
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentUrl]);
                });
              } else if (result.isDenied) {
              }
            });
          },
          error: (e: HttpErrorResponse) => {
            const msg = e.error?.msg || 'Error desconocido';
            console.error('Error del servidor:', msg);
          }
        });
      } else if (result.isDenied) {
      }
    });

  }
  abrirModal(persona: any) {
    this.personaSeleccionada = persona;
    this.modalRef = this.modalService.open(this.xlModal, { size: 'xl' });
    setTimeout(() => {
      const elementoDentroDelModal = document.getElementById('focus-target');
      elementoDentroDelModal?.focus();
    }, 100);
    this.modalRef.result.then((result) => {
      this.limpiaf()
    }).catch((res) => {
      this.limpiaf()
    });
  }

  limpiaf() {
    ['textLink', 'descripcion'
    ].forEach(campo => {
      const control = this.formModal.get(campo);
      control?.setValue(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
    this.formModal.patchValue({
      textLink: '',
      descripcion: ''
    });
  }

}
