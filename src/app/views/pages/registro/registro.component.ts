import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  mostrarExtraInfo: boolean = false;
  formTestamento: FormGroup;
  constructor(private fb: FormBuilder){
      this.formTestamento = this.fb.group({
      f_rfc:['', Validators.required],
      f_curp:['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)
      ]],
      f_nombre:[null, Validators.required],
      f_primer_apellido:['', [Validators.required, Validators.email]],
      f_segundo_apellido: ['', [Validators.required, Validators.email]],
      f_fecha_nacimiento:['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      f_lugar_nacimiento:['', Validators.required],




      edad:['', Validators.required],
      ocupacion:['', Validators.required],
      f_cp:['', Validators.required],
      estado_id:['', Validators.required],
      municipio_id:['', Validators.required],
      colonia_id:['', Validators.required],
      f_domicilio:['', Validators.required],
      numext:['', Validators.required],
      numero_tel:['', Validators.required],

      numero_cel:['', Validators.required],
      correo_per:['', Validators.required],
      numero_tel:['', Validators.required],
      numero_tel:['', Validators.required],
      numero_tel:['', Validators.required],
      numero_tel:['', Validators.required],
      numero_tel:['', Validators.required],
    });

  }

  ngOnInit(): void {
  }
}
