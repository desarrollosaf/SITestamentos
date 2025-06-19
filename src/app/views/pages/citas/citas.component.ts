

import { Component, signal, ChangeDetectionStrategy, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
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
import { NgModule } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,FullCalendarModule,HttpClientModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent {
  formCitas: FormGroup;
  http = inject(HttpClient);

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  availability = signal<Record<string, number>>({});
  
  constructor(private fb: FormBuilder, private router: Router){
      this.formCitas = this.fb.group({
      f_curp:['',[
        Validators.required,
        Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)
      ]]
    });
  }



  
  ngOnInit(): void {
this.fetchAvailability();

    this.formCitas.get('f_curp')?.valueChanges.subscribe(value => {
      if (value && value.length === 18) {
        this.buscarDatosPorCurp(value);
      }
    });
  }
  fetchAvailability() {
    this.http.get<Record<string, number>>('/api/availability')
      .subscribe(data => this.availability.set(data));
  }

  handleDateClick(arg: any) {
    const clickedDate = new Date(arg.dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isWeekend = clickedDate.getDay() === 0 || clickedDate.getDay() === 6;
    if (clickedDate < today || isWeekend) {
      alert('Día no disponible.');
      return;
    }

    const dateStr = arg.dateStr;
    const count = this.availability()[dateStr] || 0;

    if (count >= 20) {
      alert('Sin disponibilidad.');
      return;
    }

    const confirmCita = confirm(`¿Confirmar cita para el día ${dateStr}?`);
    if (confirmCita) {
      this.http.post('/api/appointments', { date: dateStr }).subscribe(() => {
        alert('Cita confirmada');
        this.fetchAvailability();
      });
    }
  }

  getDayClassNames(arg: any): string[] {
    const dateStr = arg.date.toISOString().split('T')[0];
    const date = new Date(dateStr);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    if (isWeekend) return ['no-service'];
    if (date < new Date()) return [];

    const count = this.availability()[dateStr] || 0;
    if (count >= 20) return ['no-disponibilidad'];
    if (count >= 15) return ['poca-disponibilidad'];
    return ['alta-disponibilidad'];
  }

  buscarDatosPorCurp(curp: string) {
    console.log('hd');
  }
  enviarDatos(): void {
    console.log('hjd');
  }

}
