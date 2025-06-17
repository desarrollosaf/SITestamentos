import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { SolicitudesService } from '../../../../service/solicitudes.service';
import { AfterViewInit } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-detalle-solicitud',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, RouterModule],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.scss'
})
export class DetalleSolicitudComponent {
  public _solicitudService = inject(SolicitudesService);
  public localidades: any[] = [];
  id: string;
  docs: any;
  mostrarExtraInfo: boolean = false;
  testigos: boolean = false;
  formTestamento: FormGroup;
  documentoReqFields = [
    { key: 'acta_nacimiento', label: 'Acta de nacimiento' },
    { key: 'acta_matrimonio', label: 'Acta de matrimonio' },
    { key: 'comprobante_domicilio', label: 'Comprobante de domicilio' },
    { key: 'identificacion', label: 'Identificación oficial vigente, (INE, pasaporte o cédula profesional)' },
    { key: 'curp', label: 'Clave Única de Registro de Población' }
  ];

  documentoMedFields = [
    { key: 'certificado_publico', label: 'Expedido por una institución de salud pública' },
    { key: 'certificado_privado', label: 'Expedido por una institución de salud privada' }
  ];

  documentoTesFields = [
    { key: 'identificacion', label: 'Identificación oficial vigente (Credencial para votar, pasaporte o cédula profesional)' },
    { key: 'curp', label: 'Clave unica de registro de población' },
    { key: 'comprobante_domicilio', label: 'Comprobante de domicilio' }
  ];

  documentos: { [key: string]: string | null } = {};
  documentosMed: { [key: string]: string | null } = {};
  documentosTest: { [key: string]: string | null } = {};

  constructor(private aRouter: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.id = String(aRouter.snapshot.paramMap.get('id'));
    this.formTestamento = this.fb.group({
      f_rfc: [{ value: '', disabled: true }],
      f_curp: [{ value: '', disabled: true }],
      f_nombre: [{ value: '', disabled: true }],
      f_primer_apellido: [{ value: '', disabled: true }],
      f_segundo_apellido: [{ value: '', disabled: true }],
      f_fecha_nacimiento: [{ value: '', disabled: true }],
      lugar_nacimiento: [{ value: '', disabled: true }],
      edad: [{ value: '', disabled: true }],
      ocupacion: [{ value: '', disabled: true }],
      f_cp: [{ value: '', disabled: true }],
      estado_id: [{ value: '', disabled: true }],
      municipio_id: [{ value: '', disabled: true }],
      colonia_id: [{ value: '', disabled: true }],
      f_domicilio: [{ value: '', disabled: true }],
      numext: [{ value: '', disabled: true }],
      numero_tel: [{ value: '', disabled: true }],
      numero_cel: [{ value: '', disabled: true }],
      correo_per: [{ value: '', disabled: true }],
      estado_nombre: [{ value: '', disabled: true }],
      municipio_nombre: [{ value: '', disabled: true }]
    });

  }

  ngOnInit(): void {
    this._solicitudService.getsolicitud(this.id).subscribe({
      next: (response: any) => {

        console.log(response[0]);
        this.formTestamento.patchValue({
          f_rfc: response[0].user.datos_user.f_rfc,
          f_curp: response[0].user.datos_user.f_curp,
          ocupacion: 'Servidor público',
          f_nombre: response[0].user.datos_user.f_nombre,
          f_primer_apellido: response[0].user.datos_user.f_primer_apellido,
          f_segundo_apellido: response[0].user.datos_user.f_segundo_apellido,
          f_fecha_nacimiento: response[0].user.datos_user.f_fecha_nacimiento,
          lugar_nacimiento: response[0].lugar_nacimiento,
          f_cp: response[0].user.datos_user.f_cp,
          estado_id: response[0].user.datos_user.estado_id,
          municipio_id: response[0].user.datos_user.municipio_id,
          colonia_id: response[0].user.datos_user.colonia_id,
          f_domicilio: response[0].user.datos_user.f_domicilio,
          numext: response[0].user.datos_user.numext,
          numero_tel: response[0].user.datos_user.numero_tel,
          numero_cel: response[0].user.datos_user.numero_cel,
          correo_per: response[0].user.datos_user.correo_per,
        });

        this.documentos = {};
        Object.entries(response[0]).forEach(([key, val]) => {
          this.documentos[key] = val && typeof val === 'string' ? val.replace(/\\/g, '/') : null;
        });

        if (response[0].testigos.length > 0) {
          this.mostrarExtraInfo = true;
          this.documentosMed = {};
          Object.entries(response[0]).forEach(([key, val]) => {
            this.documentosMed[key] = val && typeof val === 'string' ? val.replace(/\\/g, '/') : null;
          });
          this.docs = response[0].testigos.map((t: any) => ({
            ...t,
            identificacion: t.identificacion?.replace(/\\/g, '/'),
            curp: t.curp?.replace(/\\/g, '/'),
            comprobante_domicilio: t.comprobante_domicilio?.replace(/\\/g, '/'),
          }));
        }
        if (response[0].user.datos_user.f_cp) {
          const colon = response[0].user.datos_user.f_cp;
          this._solicitudService.getLocalidad(colon).subscribe({
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
        if (response[0].user.datos_user.f_fecha_nacimiento) {
          const edad = this.calcularEdad(response[0].user.datos_user.f_fecha_nacimiento);
          this.formTestamento.patchValue({ edad: edad + ' años' });
        }
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });

  }

  toggleExtraInfo(): void {
    this.mostrarExtraInfo = !this.mostrarExtraInfo;
    if (this.mostrarExtraInfo) {
      this.testigos = true;
      console.log('Mostrando');
    } else {
      this.testigos = false;
      console.log('Ocultando');
    }
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


  chunkArray<T>(arr: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  }
  get documentoChunks() {
    return this.chunkArray(this.documentoReqFields, 2);
  }

  get documentoChunks2() {
    return this.chunkArray(this.documentoMedFields, 2);
  }

  get documentoChunks3() {
    return this.chunkArray(this.documentoTesFields, 3);
  }

}
