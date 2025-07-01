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
@Component({
  selector: 'app-detalle-citas',
  imports: [NgxDatatableModule, CommonModule, RouterModule, FormsModule,
    ReactiveFormsModule, NgbTooltipModule],
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
  @ViewChild('table') table: DatatableComponent;
  @ViewChild('xlModal', { static: true }) xlModal!: TemplateRef<any>;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.formModal = this.fb.group({
      textLink: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.getCitas()
  }

  getCitas() {
    this._citasService.getCitas().subscribe({
      next: (response: any) => {
        console.log(response);
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
  }
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



      this._citasService.sendMsg(data).subscribe({
        next: (response: any) => {
          console.log(response);
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

  abrirModal(persona: any) {
    this.personaSeleccionada = persona;
    this.modalRef = this.modalService.open(this.xlModal, { size: 'lg' });
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
