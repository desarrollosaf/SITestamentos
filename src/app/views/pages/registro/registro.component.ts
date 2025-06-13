import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegistroService } from '../../../service/registro.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  public _registroService = inject(RegistroService);
  mostrarExtraInfo: boolean = false;
  formTestamento: FormGroup;
  documentos: { [key: string]: File | null } = {
    acta_nacimiento: null,
    acta_matrimonio: null,
    identificacion: null,
    curp: null,
    comprobante_domicilio: null,
    certificado_publico: null,
    certificado_privado: null,
  };


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
      lugar_nacimiento:['', Validators.required],
      edad:[''],
      ocupacion:['Servidor Público', Validators.required],
      f_cp:['', Validators.required],
      estado_id:['', Validators.required],
      municipio_id:['', Validators.required],
      colonia_id:['', Validators.required],
      f_domicilio:['', Validators.required],
      numext:['', Validators.required],
      numero_tel:['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numero_cel:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo_per:['', [Validators.required, Validators.email]],
    });

  }

  ngOnInit(): void {
    this.formTestamento.get('f_curp')?.valueChanges.subscribe(value => {
      if (value && value.length === 18) {
        this.buscarDatosPorCurp(value);
      }
    });
  }

  onFileSelect(event: Event, campo: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.documentos[campo] = input.files[0];
      console.log(`${campo}:`, this.documentos[campo]);
    }  
  }

  buscarDatosPorCurp(curp: string) {
      this._registroService.getDatosUser(curp).subscribe({
        next: (response: any) => {
          console.log(response);
          this.formTestamento.patchValue({
          f_rfc: response.data.f_rfc,
           f_nombre: response.data.f_nombre,
          f_primer_apellido: response.data.f_primer_apellido,
          f_segundo_apellido: response.data.f_segundo_apellido,
          f_fecha_nacimiento: response.data.f_fecha_nacimiento,

         
          });
          if (response.data.f_fecha_nacimiento) {
            console.log('ppppp');
            const edad = this.calcularEdad(response.data.f_fecha_nacimiento);
            this.formTestamento.patchValue({ f_edad: edad });
          }
        },
        error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
          console.error('Error desconocido:', e);
        }
        },
      })
  }

  calcularEdad(fechaNacimiento: string | Date): number {
  const nacimiento = new Date(fechaNacimiento);
  console.log(nacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}


}
