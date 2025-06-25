

import { Component, signal, ChangeDetectionStrategy, ElementRef, inject, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegistroService } from '../../../service/registro.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule, LOCALE_ID } from '@angular/core';

import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CitasService } from '../../../service/citas.service';
import { UserService } from '../../../core/services/user.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

registerLocaleData(localeEs, 'es');


@Component({
  selector: 'app-citas',
  imports: [CommonModule, FullCalendarModule, FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})

export class CitasComponent {
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
  modalRef: NgbModalRef; // define esto en tu componente
  public _citasService = inject(CitasService);
@ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  @ViewChild('xlModal', { static: true }) xlModal!: TemplateRef<any>;
  constructor(private fb: FormBuilder, private router: Router, private modalService: NgbModal,private _userService: UserService) {
    this.formCitas = this.fb.group({
      f_curp: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)
      ]]
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
    this.getCitasUsr()
  }

  onDateClick(arg: DateClickArg) {
    const today = new Date();
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
    this._citasService.getDisponibilidad(this.fechaFormat).subscribe({
      next: (response: any) => {
        this.numeroLugares= response.disponibles;   
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });
    this.abrirModal()
  }

abrirModal() {
  this.modalRef = this.modalService.open(this.xlModal, { size: 'lg' });
  this.modalRef.result.then((result) => {
    // console.log("Modal cerrado:", result);
  }).catch((res) => {
    // console.log("Modal cerrado por dismiss");
  });
}


  enviarDatos(): void {
      if (this.horaSeleccionada < '09:00' || this.horaSeleccionada > '18:00') {
    alert('Selecciona una hora entre 09:00 y 18:00');
    return;
  }
    this.currentUser = this._userService.currentUserValue;

    const year = this.fechaSeleccionada.getFullYear();
    const month = String(this.fechaSeleccionada.getMonth() + 1).padStart(2, '0'); // Mes va de 0 a 11
    const day = String(this.fechaSeleccionada.getDate()).padStart(2, '0');
    this.fechaFormat = `${year}-${month}-${day}`;


    const datos = {
      fecha:this.fechaFormat,
      hora: this.horaSeleccionada,
      rfc: this.currentUser.rfc
    };
    this._citasService.saveCita(datos).subscribe({
      next: (response: any) => {
        console.log(response);
        this.banderaCita = 1;
        this.agregarEventoAlCalendario(datos);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Cita guardada correctamente",
          text: "Uno de nuestros abogados se pondrá en contacto con usted.",
          showConfirmButton: false,
          timer: 5000
        });
        if (this.modalRef) {
        this.modalRef.close('');
        }
      },
      error: (e: HttpErrorResponse) => {
        console.log(e.status);
        if(e.status == 400){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "¡Atención!",
            text: "Ya tienes una cita activa",
            showConfirmButton: false,
            timer: 5000
          });
          if (this.modalRef) {
            this.modalRef.close('');
          }
        }else{
          const msg = e.error?.msg || 'Error desconocido';
          console.error('Error del servidor:', msg);
        }
      }
    });
  }


  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  agregarEventoAlCalendario(datos: any) {
    if(this.banderaCita == 0){
      if (datos.citas.length > 0) {
      datos.citas.forEach((cita: any) => {
        const fechaHora = `${cita.fecha}T${cita.hora}`;
        const nuevoEvento = {
          title: `Tiene una nueva cita`,
          start: fechaHora,
          allDay: false
        };

        if (Array.isArray(this.calendarOptions.events)) {
          this.calendarOptions.events = [...this.calendarOptions.events, nuevoEvento];
        } else {
          this.calendarOptions.events = [nuevoEvento];
        }
      });
    }
    }else{ 
      const fechaHora = `${datos.fecha}T${datos.hora}`;
      const nuevoEvento = {
        title: `Tiene una nueva cita.`,
        // title: `Cita de ${datos.rfc}`,
        start: fechaHora,
        allDay: false
      };
      if (Array.isArray(this.calendarOptions.events)) {
        this.calendarOptions.events = [...this.calendarOptions.events, nuevoEvento];
      } else {
        this.calendarOptions.events = [nuevoEvento];
      }
    }
  }

  getCitasUsr(){
    this.currentUser = this._userService.currentUserValue;
    this._citasService.getCitaUser(this.currentUser.rfc).subscribe({
      next: (response: any) => {
        this.agregarEventoAlCalendario(response);
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });  
  }

}
