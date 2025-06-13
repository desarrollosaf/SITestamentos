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
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { dp_estado_civil } from '../../../../../backend/src/models/fun/dp_estado_civil';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  public _registroService = inject(RegistroService);
  public localidades: any[] = [];
  localidadSeleccionada: number | null = null;
  mostrarExtraInfo: boolean = false;
  formTestamento: FormGroup;
  msgcurp : string;
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
      f_curp:['',[
        Validators.required,
        Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)
      ]],
      f_nombre:['', Validators.required],
      f_primer_apellido:['', Validators.required],
      f_segundo_apellido: ['', Validators.required],
      f_fecha_nacimiento:['', Validators.required],
      lugar_nacimiento:['', Validators.required],
      edad:['',],
      ocupacion:[''],
      f_cp:['', Validators.required],
      estado_id:['', Validators.required],
      municipio_id:['', Validators.required],
      colonia_id:['', Validators.required],
      f_domicilio:['', Validators.required],
      numext:['', Validators.required],
      numero_tel:['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numero_cel:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo_per:['', [Validators.required, Validators.email]],
      estado_nombre: [''], 
      municipio_nombre: ['']  
    });

  }

  ngOnInit(): void {
    this.formTestamento.get('edad')?.disable();
    this.formTestamento.get('ocupacion')?.disable();
    this.formTestamento.get('f_curp')?.valueChanges.subscribe(value => {
      if (value && value.length === 18) {
        this.buscarDatosPorCurp(value);
      }
    });
  }

  getLocalidad(){
    const cp= this.formTestamento.get('f_cp')?.value
     this.formTestamento.patchValue({
      estado_id: '',
      municipio_id: '',
      estado_nombre: '',
      municipio_nombre: ''
    });
    this.localidades = [];
    this._registroService.getLocalidad(cp).subscribe({
      next: (response: any) => {
        this.localidades = response.data;
 
        this.formTestamento.patchValue({
        colonia_id: null,
        estado_id: this.localidades[0].municipio_dp_municipio.estado_dp_estado.estadoid,
        municipio_id: this.localidades[0].municipio_dp_municipio.municipioid,
        estado_nombre: this.localidades[0].municipio_dp_municipio.estado_dp_estado.estadonom,
        municipio_nombre: this.localidades[0].municipio_dp_municipio.municipionom
        });
      },
      error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
              Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡Atención!",
            text: `Datos no encontrados con el código postal: ${cp}. Verifique los datos.`,
            showConfirmButton: false,
            timer: 3000
          });
        }
      },
    })
  }

  onFileSelect(event: Event, campo: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.documentos[campo] = input.files[0];
    }  
  }

  buscarDatosPorCurp(curp: string) {
      this.limpiaForm()
      this.msgcurp = curp;
      this._registroService.getDatosUser(curp).subscribe({
        next: (response: any) => {
          this.formTestamento.patchValue({
            f_rfc: response.data.f_rfc,
            ocupacion: 'Servidor público',
            f_nombre: response.data.f_nombre,
            f_primer_apellido: response.data.f_primer_apellido,
            f_segundo_apellido: response.data.f_segundo_apellido,
            f_fecha_nacimiento: response.data.f_fecha_nacimiento,
            f_cp: response.data.f_cp,
            estado_id: response.data.estado_id,
            municipio_id: response.data.municipio_id,
            colonia_id: response.data.colonia_id,
            f_domicilio: response.data.f_domicilio,
            numext: response.data.numext,
            numero_tel: response.data.numero_tel,
            numero_cel: response.data.numero_cel,
            correo_per: response.data.correo_per,
          });
          if(response.data.f_cp){
            const colon = response.data.f_cp;
            this._registroService.getLocalidad(colon).subscribe({
              next: (response: any) => { 
                this.localidades = response.data;
                const coloniaIdActual = this.formTestamento.get('colonia_id')?.value;
                const coloniaExiste = this.localidades.some(c => c.idcol === coloniaIdActual);
                if (coloniaExiste) {
                  this.formTestamento.get('colonia_id')?.setValue(coloniaIdActual);
                  this.formTestamento.patchValue({
                    estado_id: this.localidades[0].municipio_dp_municipio.estado_dp_estado.estadoid,
                    municipio_id: this.localidades[0].municipio_dp_municipio.municipioid,
                    estado_nombre: this.localidades[0].municipio_dp_municipio.estado_dp_estado.estadonom,
                    municipio_nombre: this.localidades[0].municipio_dp_municipio.municipionom
                  });
                } else {
                  this.formTestamento.get('colonia_id')?.reset();
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
          if (response.data.f_fecha_nacimiento) {
            const edad = this.calcularEdad(response.data.f_fecha_nacimiento);
            this.formTestamento.patchValue({ edad: edad + ' años' });
          }
        },
        error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡Atención!",
            text: `Datos no encontrados con la curp: ${this.msgcurp}. Verifique los datos.`,
            showConfirmButton: false,
            timer: 3000
          });
        }
        },
      })
  }

  calcularEdad(fechaNacimiento: string | Date): number {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }


  documentosRequeridosLlenos(): boolean {
    return this.documentos.acta_nacimiento !== null &&
          this.documentos.identificacion !== null &&
          this.documentos.comprobante_domicilio !== null &&
          this.documentos.curp !== null;
  }


  enviarDatos(): void {
    if (!this.documentosRequeridosLlenos()) {
      Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡Atención!",
            text: "Los documentos con (*) son obligatorios.",
            showConfirmButton: false,
            timer: 3000
          });
    return;
    }
    const formData = new FormData();
    for (const key in this.documentos) {
      if (this.documentos[key]) {
        formData.append(key, this.documentos[key] as File);
      }
    }
    formData.append('f_rfc', String(this.formTestamento.value.f_rfc,));
    formData.append('f_curp', String(this.formTestamento.value.f_curp,));
    formData.append('f_nombre', String(this.formTestamento.value.f_nombre,));
    formData.append('f_primer_apellido', String(this.formTestamento.value.f_primer_apellido,));
    formData.append('f_segundo_apellido', String(this.formTestamento.value.f_segundo_apellido,));
    formData.append('f_fecha_nacimiento', String(this.formTestamento.value.f_fecha_nacimiento,));
    formData.append('lugar_nacimiento', String(this.formTestamento.value.lugar_nacimiento,));
    formData.append('f_cp', String(this.formTestamento.value.f_cp,));
    formData.append('estado_id', String(this.formTestamento.value.estado_id,));
    formData.append('municipio_id', String(this.formTestamento.value.municipio_id,));
    formData.append('colonia_id', String(this.formTestamento.value.colonia_id,));
    formData.append('f_domicilio', String(this.formTestamento.value.f_domicilio,));
    formData.append('numext', String(this.formTestamento.value.numext,));
    formData.append('numero_tel', String(this.formTestamento.value.numero_tel,));
    formData.append('numero_cel', String(this.formTestamento.value.numero_cel,));
    formData.append('correo_per', String(this.formTestamento.value.correo_per,));

    // formData.forEach((valor, clave) => {
    //   console.log(clave, valor);
    // });
const curpUsr = this.formTestamento.value.f_curp;
    this._registroService.saveRegistro(formData,curpUsr).subscribe({
      next: (response: any) => {
        console.log('oki');
      },
      error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
           console.error('Error desconocido:', e);
          //     Swal.fire({
          //   position: "center",
          //   icon: "error",
          //   title: "¡Atención!",
          //   text: `Error al guardar, consulte al administrador del sistema.`,
          //   showConfirmButton: false,
          //   timer: 2000
          // });
        }
      },
    })
  }

  limpiaForm(){
    ['f_rfc', 'f_nombre', 'f_primer_apellido', 'f_segundo_apellido', 'f_fecha_nacimiento'
      , 'edad'
      , 'f_cp'
      , 'f_domicilio'
      , 'numext'
      , 'numero_tel'
      , 'numero_cel'
      , 'correo_per'
    ].forEach(campo => {
      const control = this.formTestamento.get(campo);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
    this.formTestamento.patchValue({
      estado_id: '',
      municipio_id: '',
      estado_nombre: '',
      municipio_nombre: ''
    });
    this.localidades = [];
  }
}
