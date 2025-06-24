import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { RegistroService } from '../../../../service/registro.service';

declare var bootstrap: any;
@Component({
  selector: 'app-detalle-solicitud',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
  ],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.scss',
})
export class DetalleSolicitudComponent {
  public _solicitudService = inject(SolicitudesService);
  public localidades: any[] = [];
  id: string;
  docs: any;
  mostrarExtraInfo: boolean = false;
  documentoReqFields = [
    { key: 'acta_nacimiento', label: 'Acta de nacimiento' },
    { key: 'acta_matrimonio', label: 'Acta de matrimonio' },
    { key: 'comprobante_domicilio', label: 'Comprobante de domicilio' },
    {
      key: 'identificacion',
      label:
        'Identificación oficial vigente, (INE, pasaporte o cédula profesional)',
    },
    { key: 'curp', label: 'Clave Única de Registro de Población' },
  ];

  documentoMedFields = [
    {
      key: 'certificado_publico',
      label: 'Expedido por una institución de salud pública',
    },
    {
      key: 'certificado_privado',
      label: 'Expedido por una institución de salud privada',
    },
  ];

  documentoTesFields = [
    {
      key: 'identificacion',
      label:
        'Identificación oficial vigente (Credencial para votar, pasaporte o cédula profesional)',
    },
    { key: 'curp', label: 'Clave unica de registro de población' },
    { key: 'comprobante_domicilio', label: 'Comprobante de domicilio' },
  ];
  doctos: { [key: string]: string | null } = {
    comprobante_residencia: null,
    ine: null,
    situacion_fiscal: null,
    primer_testamento_doc: null,
    acta_nacimiento: null,
    acta_matrimonio: null,
    curp: null,
    comprobante_domicilio: null
  };







  documentos: { [key: string]: string | null } = {};
  documentosMed: { [key: string]: string | null } = {};
  documentosTest: { [key: string]: string | null } = {};
  estadoCivilArray: { id: number | string; name: string }[] = [];
  //****************************************************************************************************** */
  public _registroService = inject(RegistroService);
  localidadSeleccionada: number | null = null;
  mostrarCamposTestamento = false;
  mostrarCamposMenorDeEdad = false;
  mostrarBtnTestigo = false;
  mostrarDoctoIdentifica = false;
  padreNac = false;
  madreNac = false;
  mostrarNacServ = false;
  labelDocumentoIdentifica = '';

  testigos: boolean = false;
  formTestamento: FormGroup;
  msgcurp: string;
  // documentos: { [key: string]: File | null } = {
  //   acta_nacimiento: null,
  //   acta_matrimonio: null,
  //   ine: null,
  //   curp: null,
  //   comprobante_domicilio: null,
  //   certificado_publico: null,
  //   certificado_privado: null,
  //   constancia_situacion_fiscal: null,
  //   // t1_identificacion: null,
  //   // t1_curp: null,
  //   // t1_comprobante_domicilio: null,
  //   // t2_identificacion: null,
  //   // t2_curp: null,
  //   // t2_comprobante_domicilio: null,
  //   // t3_identificacion: null,
  //   // t3_curp: null,
  //   // t3_comprobante_domicilio: null,
  //   primer_testamento_doc :null,
  //   comprobante_residencia: null
  // };

  documentosTestigos: {
    [index: number]: {
      identificacion_t?: File | null;
      curp_t?: File | null;
      comprobante_domicilio_t?: File | null;
    };
  } = {};

  vive = [
    { id: '', name: '--Selecciona--' },
    { id: '1', name: 'Vive' },
    { id: '0', name: 'Finado' },
  ];

  nacionalidad = [
    { id: '', name: '--Selecciona--' },
    { id: '1', name: 'Mexicana' },
    { id: '0', name: 'Otro' },
  ];
  regimenP = [
    { id: '', name: '--Selecciona--' },
    { id: '0', name: 'Sociedad Conyugal' },
    { id: '1', name: 'Separacion de Bienes' },
    { id: '2', name: 'Concubinato' },
  ];

  primerTestamento = [
    { id: '', name: '--Selecciona--' },
    { id: '1', name: 'Si' },
    { id: '0', name: 'No' },
  ];
  bajoProtesta = [
    { id: '', name: '--Selecciona--' },
    { id: '1', name: 'Si' },
    { id: '0', name: 'No' },
  ];
  doctoIdentifica = [
    { id: '', name: '--Selecciona--' },
    { id: 'INE', name: 'INE' },
    { id: 'Pasaporte', name: 'Pasaporte' },
    { id: 'Cédula profesional', name: 'Cédula profesional' },
  ];

  currentUser: any;

  constructor(
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = String(aRouter.snapshot.paramMap.get('id'));
    this.formTestamento = this.fb.group({
      f_rfc: ['', Validators.required],
      f_curp: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/
          ),
        ],
      ],
      f_nombre: ['', Validators.required],
      f_primer_apellido: ['', Validators.required],
      f_segundo_apellido: ['', Validators.required],
      f_fecha_nacimiento: ['', Validators.required],
      lugar_nacimiento: ['', Validators.required],
      edad: [''],
      ocupacion: [''],
      estado_civil: ['', Validators.required],
      f_cp: ['', Validators.required],
      estado_id: ['', Validators.required],
      municipio_id: ['', Validators.required],
      colonia_id: ['', Validators.required],
      f_domicilio: ['', Validators.required],
      numext: ['', Validators.required],
      numero_tel: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      numero_cel: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo_per: ['', [Validators.required, Validators.email]],
      estado_nombre: [''],
      municipio_nombre: [''],
      vive_padre: ['', Validators.required],
      nacionalidad_padre: ['', Validators.required],
      f_nombre_padre: ['', Validators.required],
      f_primer_apellido_padre: ['', Validators.required],
      f_segundo_apellido_padre: ['', Validators.required],
      especifique_nac_padre: [{ value: '', disabled: true }],
      vive_madre: ['', Validators.required],
      nacionalidad_madre: ['', Validators.required],
      f_nombre_madre: ['', Validators.required],
      f_primer_apellido_madre: ['', Validators.required],
      f_segundo_apellido_pmadre: ['', Validators.required],
      especifique_nac_madre: [{ value: '', disabled: true }],
      nombre_primer_nup: [''],
      primer_apellido_primer_nup: [''],
      segundo_apellido_primer_nup: [''],
      vive_primer_nup: [''],
      regimen_patrimonial_primer_nup: [''],
      hijosPrimer: this.fb.array([]),
      nombre_dos_nup: [''],
      primer_apellido_dos_nup: [''],
      segundo_apellido_dos_nup: [''],
      vive_dos_nup: [''],
      regimen_patrimonial_dos_nup: [''],
      hijosSegundo: this.fb.array([]),
      nombre_fuera_matri: [''],
      primer_apellido_fuera_matri: [''],
      segundo_apellido_fuera_matri: [''],
      hijosFueraMatrim: this.fb.array([]),

      primer_testamento: ['', Validators.required],
      fecha_primer_testamento: ['', Validators.required],
      notaria_primer_testamento: ['', Validators.required],
      instrumento_primer_testamento: ['', Validators.required],

      sabe_leer: ['', Validators.required],
      sabe_escribir: ['', Validators.required],
      puede_hablar: ['', Validators.required],
      puede_ver: ['', Validators.required],
      puede_oir: ['', Validators.required],
      presenta_dificultad: [''],
      menor_de_edad: ['', Validators.required],

      nombre_tutor: ['', Validators.required],
      primer_apellido_tutor: ['', Validators.required],
      segundo_apellido_tutor: ['', Validators.required],
      nombre_tutor_sustituto: ['', Validators.required],
      primer_apellido_tutor_sustituto: ['', Validators.required],
      segundo_apellido_tutor_sustituto: ['', Validators.required],

      nombre_curador: ['', Validators.required],
      primer_apellido_curador: ['', Validators.required],
      segundo_apellido_curador: ['', Validators.required],

      nombre_a_su_falta_curador: ['', Validators.required],
      primer_apellido_a_su_falta_curador: ['', Validators.required],
      segundo_apellido_a_su_falta_curador: ['', Validators.required],

      derecho_acrecer: ['', Validators.required],
      herederoAdd: this.fb.array([]),

      derecho_acrecer_sustituto: ['', Validators.required],
      herederoSustituto: this.fb.array([]),

      nombre_albacea: ['', Validators.required],
      primer_apellido_albacea: ['', Validators.required],
      segundo_apellido_albacea: ['', Validators.required],

      nombre_falta_albacea: ['', Validators.required],
      primer_apellido_falta_albacea: ['', Validators.required],
      segundo_apellido_falta_albacea: ['', Validators.required],

      documento_identifica: ['', Validators.required],
      numero_documento_identifica: [{ value: '', disabled: true }],

      testigoArr: this.fb.array([]),
      nacionalidad_serv: ['', Validators.required],
      indique_nacionalidad_serv: [''],
      documento_residencia_serv: [''],
      // nacionalidad_testigo:[''],
      // fecha_nacimiento_testigo:[''],
      // lugar_nacimiento_testigo:[''],
      // curp_testigo:[''],
      // estado_civil_testigo:[''],
      // ocupacion_testigo:[''],
      // domicilio_testigo:[''],
      // cp_testigo:[''],
      // telefono_testigo:[''],
      // rfc_testigo:[''],
    });
  }
  get hijos(): FormArray {
    return this.formTestamento.get('hijosPrimer') as FormArray;
  }
  get hijosDos(): FormArray {
    return this.formTestamento.get('hijosSegundo') as FormArray;
  }
  get hijosFuera(): FormArray {
    return this.formTestamento.get('hijosFueraMatrim') as FormArray;
  }
  get herederos(): FormArray {
    return this.formTestamento.get('herederoAdd') as FormArray;
  }
  get herederoSustit(): FormArray {
    return this.formTestamento.get('herederoSustituto') as FormArray;
  }
  get testigosF(): FormArray {
    return this.formTestamento.get('testigoArr') as FormArray;
  }


  ngOnInit(): void {
    this._solicitudService.getsolicitud(this.id).subscribe({
      next: (response: any) => {
        // console.log(response.solicitud[0]);
        this.estadoCivilArray = [
          { id: '', name: '--Selecciona--' },
          ...response.estadocivil.map((item: { id: number; estado_civil: string }) => ({
            id: item.id,
            name: item.estado_civil
          }))
        ];
        this.formTestamento.get('estado_civil')?.setValue(response.solicitud[0].datos_user.estadocivil_id);
        this.formTestamento.get('documento_identifica')?.setValue(response.solicitud[0].documento_identifica);
        if (response.solicitud[0].documento_identifica == 'Pasaporte' || response.solicitud[0].documento_identifica == 'Cédula profesional') {
          this.mostrarDoctoIdentifica = true;
          this.labelDocumentoIdentifica = response.solicitud[0].documento_identifica;
          this.formTestamento.patchValue({
            numero_documento_identifica: response.solicitud[0].numero_documento_identifica,
          });
        }
        this.formTestamento.get('nacionalidad_serv')?.setValue(response.solicitud[0].nacionalidad);
        if (response.solicitud[0].nacionalidad == '0') {
          this.mostrarNacServ = true;
          this.formTestamento.patchValue({
            indique_nacionalidad_serv: response.solicitud[0].indique_nacionalidad_serv,
          });
          this.formTestamento.get('documento_residencia_serv')?.setValue(response.solicitud[0].documento_residencia);
          response.solicitud[0].documentos.forEach((doc: any) => {
            if (doc.tipo_doc.tipo == 'comprobante_residencia') {
              this.doctos['comprobante_residencia'] = doc.archivo_path || null;
            }
          });
        }
        response.solicitud[0].documentos.forEach((doc: any) => {
          if (doc.tipo_doc.tipo == 'ine') {
            this.doctos['ine'] = doc.archivo_path || null;
          }
          if (doc.tipo_doc.tipo == 'constancia_situacion_fiscal') {
            this.doctos['situacion_fiscal'] = doc.archivo_path || null;
          }
        });

        this.formTestamento.patchValue({
          f_rfc: response.solicitud[0].datos_user.f_rfc,
          f_curp: response.solicitud[0].datos_user.f_curp,
          ocupacion: 'Servidor público',
          f_nombre: response.solicitud[0].datos_user.f_nombre,
          f_primer_apellido: response.solicitud[0].datos_user.f_primer_apellido,
          f_segundo_apellido: response.solicitud[0].datos_user.f_segundo_apellido,
          f_fecha_nacimiento: response.solicitud[0].datos_user.f_fecha_nacimiento,
          lugar_nacimiento: response.solicitud[0].lugar_nacimiento,
          f_cp: response.solicitud[0].datos_user.f_cp,
          estado_id: response.solicitud[0].datos_user.estado_id,
          municipio_id: response.solicitud[0].datos_user.municipio_id,
          colonia_id: response.solicitud[0].datos_user.colonia_id,
          f_domicilio: response.solicitud[0].datos_user.f_domicilio,
          numext: response.solicitud[0].datos_user.numext,
          numero_tel: response.solicitud[0].datos_user.numero_tel,
          numero_cel: response.solicitud[0].datos_user.numero_cel,
          correo_per: response.solicitud[0].datos_user.correo_per,
        });

        for (const padre of response.solicitud[0].padres) {
          if (padre.tipo == '1') {
            this.formTestamento.patchValue({
              f_nombre_padre: padre.nombre,
              f_primer_apellido_padre: padre.primer_apellido,
              f_segundo_apellido_padre: padre.segundo_apellido,
              especifique_nac_padre: padre.especifique_nacionalidad,
            });
            this.formTestamento.get('vive_padre')?.setValue(padre.vive);
            this.formTestamento
              .get('nacionalidad_padre')
              ?.setValue(padre.nacionalidad);
            if (padre.nacionalidad == '0') {
              this.padreNac = true;
            }
          }
          if (padre.tipo == '2') {
            this.formTestamento.patchValue({
              f_nombre_madre: padre.nombre,
              f_primer_apellido_madre: padre.primer_apellido,
              f_segundo_apellido_pmadre: padre.segundo_apellido,
              especifique_nac_madre: padre.especifique_nacionalidad,
            });
            this.formTestamento.get('vive_madre')?.setValue(padre.vive);
            this.formTestamento
              .get('nacionalidad_madre')
              ?.setValue(padre.nacionalidad);
            if (padre.nacionalidad == '0') {
              this.madreNac = true;
            }
          }
        }

        if (response.solicitud[0].primeras_nupcias.length > 0) {

          this.formTestamento.patchValue({
            nombre_primer_nup: response.solicitud[0].primeras_nupcias[0].nombre,
            primer_apellido_primer_nup: response.solicitud[0].primeras_nupcias[0].primer_apellido,
            segundo_apellido_primer_nup: response.solicitud[0].primeras_nupcias[0].segundo_apellido,
          });
          this.formTestamento.get('vive_primer_nup')?.setValue(response.solicitud[0].primeras_nupcias[0].vive);
          this.formTestamento.get('regimen_patrimonial_primer_nup')?.setValue(response.solicitud[0].primeras_nupcias[0].regimen_patrimonial);
          if (response.solicitud[0].primeras_nupcias[0].hijos.length > 0) {
            response.solicitud[0].primeras_nupcias[0].hijos.forEach((hijo: any) => {
              const hijoGroup = this.fb.group({
                hijo_nombre_primer_nup: [hijo.nombre],
                hijo_primer_apellido_primer_nup: [hijo.primer_apellido],
                hijo_segundo_apellido_primer_nup: [hijo.segundo_apellido],
                hijo_edad_primer_nup: [hijo.edad],
                hijo_vf_primer_nup: [hijo.vive]
              });
              this.hijos.push(hijoGroup);
            });
          }
        }

        if (response.solicitud[0].segundas_nupcias.length > 0) {
          this.formTestamento.patchValue({
            nombre_dos_nup: response.solicitud[0].segundas_nupcias[0].nombre,
            primer_apellido_dos_nup: response.solicitud[0].segundas_nupcias[0].primer_apellido,
            segundo_apellido_dos_nup: response.solicitud[0].segundas_nupcias[0].segundo_apellido,
          });
          this.formTestamento.get('vive_dos_nup')?.setValue(response.solicitud[0].segundas_nupcias[0].vive);
          this.formTestamento.get('regimen_patrimonial_dos_nup')?.setValue(response.solicitud[0].segundas_nupcias[0].regimen_patrimonial);

          if (response.solicitud[0].segundas_nupcias[0].hijos.length > 0) {
            response.solicitud[0].segundas_nupcias[0].hijos.forEach((hijo: any) => {
              const hijoDosGroup = this.fb.group({
                hijo_nombre_dos_nup: [hijo.nombre],
                hijo_primer_apellido_dos_nup: [hijo.primer_apellido],
                hijo_segundo_apellido_dos_nup: [hijo.segundo_apellido],
                hijo_edad_dos_nup: [hijo.edad],
                hijo_vf_dos_nup: [hijo.vive]
              });
              this.hijosDos.push(hijoDosGroup);
            });
          }
        }
        if (response.solicitud[0].hijo_fuera.length > 0) {
          this.formTestamento.patchValue({
            nombre_fuera_matri: response.solicitud[0].hijo_fuera[0].nombre_fuera,
            primer_apellido_fuera_matri: response.solicitud[0].hijo_fuera[0].primer_apellido_fuera_matri,
            segundo_apellido_fuera_matri: response.solicitud[0].hijo_fuera[0].segundo_apellido_fuera_matri,
          });
          response.solicitud[0].hijo_fuera.forEach((hijo: any) => {
            const hijoFueraGroup = this.fb.group({
              fuera_hijo_nombre: [hijo.nombre],
              fuera_hijo_primer_apellido: [hijo.primer_apellido],
              fuera_hijo_segundo_apellido: [hijo.segundo_apellido],
              fuera_hijo_edad: [hijo.edad],
              fuera_hijo_vf: [hijo.vive]
            });
            this.hijosFuera.push(hijoFueraGroup);
          });
        }
        this.formTestamento.get('primer_testamento')?.setValue(response.solicitud[0].es_primer_testamento);

        if (response.solicitud[0].es_primer_testamento == '0') {
          this.mostrarCamposTestamento = true;
          const fechaFormateada = this.formatearFecha(response.solicitud[0].testamentos_pasados.fecha_tramite);
          this.formTestamento.patchValue({
            fecha_primer_testamento: fechaFormateada,
            notaria_primer_testamento: response.solicitud[0].testamentos_pasados.notaria,
            instrumento_primer_testamento: response.solicitud[0].testamentos_pasados.instrumento_volumen
          });
          this.doctos['primer_testamento_doc'] = response.solicitud[0].testamentos_pasados.path_testamento || null;
        }
        this.formTestamento.get('sabe_leer')?.setValue(response.solicitud[0].sabe_leer);
        this.formTestamento.get('sabe_escribir')?.setValue(response.solicitud[0].sabe_escribir);
        this.formTestamento.get('puede_hablar')?.setValue(response.solicitud[0].puede_hablar);
        this.formTestamento.get('puede_ver')?.setValue(response.solicitud[0].puede_ver);
        this.formTestamento.get('puede_oir')?.setValue(response.solicitud[0].puede_oir);
        this.formTestamento.patchValue({
          fecha_primer_testamento: response.solicitud[0].dificultad_comunicacion,
        });

        // AGREGAR LA FUNCIONN PARA LOS TESTIGOS*****************************************************************************
        this.mostrarBtnTestigo = [
          response.solicitud[0].sabe_leer,
          response.solicitud[0].sabe_escribir,
          response.solicitud[0].puede_hablar,
          response.solicitud[0].puede_ver,
          response.solicitud[0].puede_oir
        ].some(valor => valor === 0);
        if (response.solicitud[0].testigos.length > 0) {


          response.solicitud[0].testigos.forEach((testigo: any) => {
            const testigosGroup = this.fb.group({
              nombre_testigo: [testigo.nombre_testigo],
              primer_apellido_testigo: [testigo.primer_apellido_testigo],
              segundo_apellido_testigo: [testigo.segundo_apellido_testigo],
              nacionalidad_testigo: [testigo.nacionalidad],
              fecha_nacimiento_testigo: [testigo.fecha_naciento],
              lugar_nacimiento_testigo: [testigo.lugar_nacimiento],
              curp_testigo: [testigo.curp],
              estado_civil_testigo: [testigo.estado_civil],
              ocupacion_testigo: [testigo.ocupacion],
              domicilio_testigo: [testigo.domicilio],
              cp_testigo: [testigo.cp],
              telefono_testigo: [testigo.telefono],
              rfc_testigo: [testigo.rfc],
              curpt: [testigo.curp || null],
              comprobante_domiciliot: [testigo.comprobante_domicilio || null],
              identificaciont: [testigo.identificacion || null]
            });
            this.testigosF.push(testigosGroup);
          });
        }




        // AGREGAR LA FUNCIONN PARA LOS TESTIGOS*****************************************************************************
        this.formTestamento.get('menor_de_edad')?.setValue(response.solicitud[0].heredero_menor_edad);
        if (response.solicitud[0].heredero_menor_edad == '1') {
          this.mostrarCamposMenorDeEdad = true;
          this.formTestamento.patchValue({
            nombre_tutor: response.solicitud[0].tutor_descendientes.nombre_tutor,
            primer_apellido_tutor: response.solicitud[0].tutor_descendientes.primer_apellido_tutor,
            segundo_apellido_tutor: response.solicitud[0].tutor_descendientes.segundo_apellido_tutor,
            nombre_tutor_sustituto: response.solicitud[0].tutor_descendientes.nombre_tutor_sustituto,
            primer_apellido_tutor_sustituto: response.solicitud[0].tutor_descendientes.primer_apellido_tutor_sustituto,
            segundo_apellido_tutor_sustituto: response.solicitud[0].tutor_descendientes.segundo_apellido_tutor_sustituto,
            nombre_curador: response.solicitud[0].tutor_descendientes.nombre_curador,
            primer_apellido_curador: response.solicitud[0].tutor_descendientes.primer_apellido_curador,
            segundo_apellido_curador: response.solicitud[0].tutor_descendientes.segundo_apellido_curador,
            nombre_a_su_falta_curador: response.solicitud[0].tutor_descendientes.nombre_a_su_falta_curador,
            primer_apellido_a_su_falta_curador: response.solicitud[0].tutor_descendientes.primer_apellido_a_su_falta_curador,
            segundo_apellido_a_su_falta_curador: response.solicitud[0].tutor_descendientes.segundo_apellido_a_su_falta_curador
          });
        }






        if (response.solicitud[0].herederos.length > 0) {
          this.formTestamento.get('derecho_acrecer')?.setValue(response.solicitud[0].herederos[0].derecho_acrecer);
          response.solicitud[0].herederos.forEach((hijo: any) => {
            const HerederosGroup = this.fb.group({
              nombre_heredero: [hijo.nombre_heredero],
              primer_apellido_heredero: [hijo.primer_apellido_heredero],
              segundo_apellido_heredero: [hijo.segundo_apellido_heredero],
              edad_heredero: [hijo.edad],
              parentesco_heredero: [hijo.parentesco],
              porcentaje_heredero: [hijo.porcentaje]
            });
            this.herederos.push(HerederosGroup);
          });
        }

        if (response.solicitud[0].herederos_susti.length > 0) {
          this.formTestamento.get('derecho_acrecer_sustituto')?.setValue(response.solicitud[0].herederos_susti[0].derecho_acrecer);
          response.solicitud[0].herederos_susti.forEach((hijo: any) => {
            const HerederosSustGroup = this.fb.group({
              nombre_sustituto: [hijo.nombre_sustituto],
              primer_apellido_sustituto: [hijo.segundo_apellido_sustituto],
              segundo_apellido_sustituto: [hijo.segundo_apellido_sustituto],
              nombre_a_sustituir: [hijo.nombre_a_sustituir],
              primer_apellido_a_sustituir: [hijo.primer_apellido_a_sustituir],
              segundo_apellido_a_sustituir: [hijo.segundo_apellido_a_sustituir]
            });
            this.herederoSustit.push(HerederosSustGroup);
          });
        }
        this.formTestamento.patchValue({
          nombre_albacea: response.solicitud[0].albacea.nombre_albacea,
          primer_apellido_albacea: response.solicitud[0].albacea.primer_apellido_albacea,
          segundo_apellido_albacea: response.solicitud[0].albacea.segundo_apellido_albacea,
          nombre_falta_albacea: response.solicitud[0].albacea.nombre_falta_albacea,
          primer_apellido_falta_albacea: response.solicitud[0].albacea.primer_apellido_falta_albacea,
          segundo_apellido_falta_albacea: response.solicitud[0].albacea.segundo_apellido_falta_albacea
        });

        response.solicitud[0].documentos.forEach((doc: any) => {
          if (doc.tipo_doc.tipo == 'comprobante_domicilio') {
            this.doctos['comprobante_domicilio'] = doc.archivo_path || null;
          }
          if (doc.tipo_doc.tipo == 'constancia_situacion_fiscal') {
            this.doctos['constancia_situacion_fiscal'] = doc.archivo_path || null;
          }
          if (doc.tipo_doc.tipo == 'acta_matrimonio') {
            this.doctos['acta_matrimonio'] = doc.archivo_path || null;
          }
          if (doc.tipo_doc.tipo == 'curp') {
            this.doctos['curp'] = doc.archivo_path || null;
          }
        });


        if (response.solicitud[0].datos_user.f_cp) {
          const colon = response.solicitud[0].datos_user.f_cp;
          this._solicitudService.getLocalidad(colon).subscribe({
            next: (response: any) => {
              this.localidades = response.data;
              const coloniaIdActual =
                this.formTestamento.get('colonia_id')?.value;
              const coloniaExiste = this.localidades.some(
                (c) => c.idcol === coloniaIdActual
              );
              if (coloniaExiste) {
                this.formTestamento
                  .get('colonia_id')
                  ?.setValue(coloniaIdActual);
                this.formTestamento.patchValue({
                  estado_id:
                    this.localidades[0].municipio_dp_municipio.estado_dp_estado
                      .estadoid,
                  municipio_id:
                    this.localidades[0].municipio_dp_municipio.municipioid,
                  estado_nombre:
                    this.localidades[0].municipio_dp_municipio.estado_dp_estado
                      .estadonom,
                  municipio_nombre:
                    this.localidades[0].municipio_dp_municipio.municipionom,
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
          });
        }
        if (response.solicitud[0].datos_user.f_fecha_nacimiento) {
          const edad = this.calcularEdad(
            response.solicitud[0].datos_user.f_fecha_nacimiento
          );
          this.formTestamento.patchValue({ edad: edad + ' años' });
        }
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      },
    });
  }

  formatearFecha(fechaStr: string | Date): string {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Enero = 0
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  toggleExtraInfo(): void {
    this.mostrarExtraInfo = !this.mostrarExtraInfo;
    if (this.mostrarExtraInfo) {
      this.testigos = true;
    } else {
      this.testigos = false;
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
}
