

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
  constructor(private fb: FormBuilder, private router: Router){
      this.formCitas = this.fb.group({
      f_curp:['',[
        Validators.required,
        Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.formCitas.get('f_curp')?.valueChanges.subscribe(value => {
      if (value && value.length === 18) {
        this.buscarDatosPorCurp(value);
      }
    });
  }


  buscarDatosPorCurp(curp: string) {
    console.log('hd');
  }
  enviarDatos(): void {
    console.log('hjd');
  }

}
