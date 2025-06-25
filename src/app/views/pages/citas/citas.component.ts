

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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CitasService } from '../../../service/citas.service';
import { UserService } from '../../../core/services/user.service';

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
  public _citasService = inject(CitasService);

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
    dayMaxEvents: true,
    events: [
      { title: 'Evento de ejemplo', date: '2025-07-15' }
    ],
  };

  ngOnInit(): void { }

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
    console.log(this.fechaFormat);
    this._citasService.getDisponibilidad(this.fechaFormat).subscribe({
      next: (response: any) => {
        this.numeroLugares= response.disponibles;
        console.log(response.disponibles)   
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });
    this.modalService.open(this.xlModal, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
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
    console.log(datos);
  }
}
