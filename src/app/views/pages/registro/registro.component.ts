import { Component, ElementRef, inject, QueryList, ViewChildren, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegistroService } from '../../../service/registro.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  mostrarCamposTestamento = false;
  mostrarCamposMenorDeEdad = false;
  @ViewChild('xlModal', { static: true }) xlModal!: TemplateRef<any>;

  mostrarDoctoIdentifica = false;

  mostrarNacServ = false;
  labelDocumentoIdentifica = '';
  mostrarFormulario = false;

  testigos: boolean = false;
  formTestamento: FormGroup;
  msgcurp : string;
  documentos: { [key: string]: File | null } = {
    acta_nacimiento: null,
    acta_matrimonio: null,
    ine: null,
    curp: null,
    comprobante_domicilio: null,
    certificado_publico: null,
    certificado_privado: null,
    constancia_situacion_fiscal: null,
    // t1_identificacion: null,
    // t1_curp: null,
    // t1_comprobante_domicilio: null,
    // t2_identificacion: null,
    // t2_curp: null,
    // t2_comprobante_domicilio: null,
    // t3_identificacion: null,
    // t3_curp: null,
    // t3_comprobante_domicilio: null,
    primer_testamento_doc :null,
    comprobante_residencia: null
  };
 

  documentosTestigos: {
    [index: number]: {
      identificacion_t?: File | null;
      curp_t?: File | null;
      comprobante_domicilio_t?: File | null;
    };
  } = {};
  estadoCivilArray: { id: number | string; name: string }[] = [];

  vive = [
      { id: '', name: '--Selecciona--' },
      { id: '1', name: 'Vive' },
      { id: '0', name: 'Finado' }
    ];

  nacionalidad = [
    { id: '', name: '--Selecciona--' },
    { id: '1', name: 'Mexicana' },
    { id: '0', name: 'Otro' }
  ];
  regimenP = [
    { id: '', name: '--Selecciona--' },
    { id: '0', name: 'Sociedad Conyugal' },
    { id: '1', name: 'Separacion de Bienes' },
    { id: '2', name: 'Concubinato' }
    
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
    { id: 'Cédula profesional', name: 'Cédula profesional' }
  ];

  datos_personales: any = {};
  currentUser: any;
  estatusSolicitud: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private _userService: UserService, private modalService: NgbModal){
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
        estado_civil: ['', Validators.required],
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
        municipio_nombre: [''],
        vive_padre:['', Validators.required],
        nacionalidad_padre:['', Validators.required],
        f_nombre_padre:['', Validators.required],
        f_primer_apellido_padre:['', Validators.required],
        f_segundo_apellido_padre:['', Validators.required],
        especifique_nac_padre: [{ value: '', disabled: true }],
        vive_madre:['', Validators.required],
        nacionalidad_madre:['', Validators.required],
        f_nombre_madre:['', Validators.required],
        f_primer_apellido_madre:['', Validators.required],
        f_segundo_apellido_pmadre:['', Validators.required],
        especifique_nac_madre: [{ value: '', disabled: true }],
        nombre_primer_nup: [''],
        primer_apellido_primer_nup: [''],
        segundo_apellido_primer_nup: [''],
        vive_primer_nup:[''],
        regimen_patrimonial_primer_nup:[''],
        hijosPrimer: this.fb.array([]),
        nombre_dos_nup: [''],
        primer_apellido_dos_nup: [''],
        segundo_apellido_dos_nup: [''],
        vive_dos_nup:[''],
        regimen_patrimonial_dos_nup:[''],
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

        nombre_tutor:  ['', Validators.required],
        primer_apellido_tutor: ['', Validators.required],
        segundo_apellido_tutor:  ['', Validators.required],
        nombre_tutor_sustituto:  ['', Validators.required],
        primer_apellido_tutor_sustituto:  ['', Validators.required],
        segundo_apellido_tutor_sustituto:  ['', Validators.required],

        nombre_curador:  ['', Validators.required],
        primer_apellido_curador:  ['', Validators.required],
        segundo_apellido_curador:  ['', Validators.required],

        nombre_a_su_falta_curador:  ['', Validators.required],
        primer_apellido_a_su_falta_curador:  ['', Validators.required],
        segundo_apellido_a_su_falta_curador:  ['', Validators.required],

        derecho_acrecer: ['', Validators.required],
        herederoAdd: this.fb.array([]),

        derecho_acrecer_sustituto:['', Validators.required],
        herederoSustituto: this.fb.array([]),

        nombre_albacea:  ['', Validators.required],
        primer_apellido_albacea:  ['', Validators.required],
        segundo_apellido_albacea:  ['', Validators.required],

        nombre_falta_albacea:  ['', Validators.required],
        primer_apellido_falta_albacea:  ['', Validators.required],
        segundo_apellido_falta_albacea:  ['', Validators.required],

        documento_identifica: ['',Validators.required],
        numero_documento_identifica: [{ value: '', disabled: true }],

        testigoArr: this.fb.array([]),
        nacionalidad_serv:['',Validators.required],
        indique_nacionalidad_serv:[''],
        documento_residencia_serv:[''],
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

    this.initToggle('nacionalidad_padre', 'especifique_nac_padre');
    this.initToggle('nacionalidad_madre', 'especifique_nac_madre');


    this.formTestamento.get('documento_identifica')!.valueChanges.subscribe((valor) => {
      const controlExtra = this.formTestamento.get('numero_documento_identifica');

      if (valor === 'Pasaporte') {
        this.mostrarDoctoIdentifica = true;
        this.labelDocumentoIdentifica = 'Número de pasaporte';
        controlExtra?.setValidators([Validators.required]);
        controlExtra?.enable();
      } else if (valor === 'Cédula profesional') {
        this.mostrarDoctoIdentifica = true;
        this.labelDocumentoIdentifica = 'Cédula profesional';
        controlExtra?.setValidators([Validators.required]);
        controlExtra?.enable();
      } else {
        this.mostrarDoctoIdentifica = false;
        controlExtra?.setValue('');
        controlExtra?.clearValidators();
        controlExtra?.disable();
      }

      controlExtra?.updateValueAndValidity();
    });
  

 //PARA MOSTRAR EL DIV nacionalidad_serv
    this.formTestamento.get('nacionalidad_serv')?.valueChanges.subscribe(valor => {
      this.mostrarNacServ = valor === '0';
      const campos = [
        'indique_nacionalidad_serv',
        'documento_residencia_serv'
      ];

      campos.forEach(control => {
        const c = this.formTestamento.get(control);
        if (valor === '0') {
          c?.enable();
        } else {
          c?.disable();
        }
      });
    });



    //PARA MOSTRAR EL DIV EN CASO DE QUE NO SEA EL PRIMER TESTAMENTO
    this.formTestamento.get('primer_testamento')?.valueChanges.subscribe(valor => {
      this.mostrarCamposTestamento = valor === '0';

      const campos = [
        'fecha_primer_testamento',
        'notaria_primer_testamento',
        'instrumento_primer_testamento'
      ];

      campos.forEach(control => {
        const c = this.formTestamento.get(control);
        if (valor === '0') {
          c?.enable();
        } else {
          c?.disable();
        }
      });
    });

    //PARA MOSTRAR EL DIV EN CASO DE QUE EL HEREDERO SEA MENOR DE EDAD
    this.formTestamento.get('menor_de_edad')?.valueChanges.subscribe(valor => {
      this.mostrarCamposMenorDeEdad = valor === '1';
      const campos = [
        'nombre_tutor',
        'primer_apellido_tutor',
        'segundo_apellido_tutor',
        'nombre_tutor_sustituto',
        'primer_apellido_tutor_sustituto',
        'segundo_apellido_tutor_sustituto',
        'nombre_curador',
        'primer_apellido_curador',
        'segundo_apellido_curador',
        'nombre_a_su_falta_curador',
        'primer_apellido_a_su_falta_curador',
        'segundo_apellido_a_su_falta_curador'
      ];

      campos.forEach(control => {
        const c = this.formTestamento.get(control);
        if (valor === '1') {
          c?.enable();
        } else {
          c?.disable();
        }
      });
    });
  }


  get mostrarBtnTestigo(): boolean {
  const valores = this.formTestamento.value;
  return (
    valores.sabe_leer === '0' ||
    valores.sabe_escribir === '0' ||
    valores.puede_hablar === '0' ||
    valores.puede_ver === '0' ||
    valores.puede_oir === '0'
  );
}



  get testigosF(): FormArray {
  return this.formTestamento.get('testigoArr') as FormArray;
  }

  empezar(): void {
    this.mostrarFormulario = true;
  }

  
  fechaMaximaValidator(maxDate: Date): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = (formGroup as FormGroup).get('fecha_primer_testamento');
      if (!control || !control.value) return null;

      const fecha = new Date(control.value);
      if (isNaN(fecha.getTime())) return null;

      return fecha > maxDate ? { fechaMaxima: true } : null;
    };
  }

  agregarTestigo() {
    const group = this.fb.group({
      nombre_testigo: ['', Validators.required],
      primer_apellido_testigo: ['', Validators.required],
      segundo_apellido_testigo: ['', Validators.required],
      nacionalidad_testigo: ['', Validators.required],
      fecha_nacimiento_testigo: ['', Validators.required],
      lugar_nacimiento_testigo: ['', Validators.required],
      curp_testigo: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}\d{1}$/)]],
      estado_civil_testigo: ['', Validators.required],
      ocupacion_testigo: ['', Validators.required],
      domicilio_testigo: ['', Validators.required],
      cp_testigo: ['', Validators.required],
      telefono_testigo: ['', Validators.required],
      rfc_testigo: ['',[Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
    });

    this.testigosF.push(group);
  }

  eliminarTestigo(index: number) {
    this.testigosF.removeAt(index);
    delete this.documentosTestigos[index];
    this.reindexarArchivos();
  }

  onFileSelecTestigos(event: Event, index: number, tipo: 'identificacion_t' | 'curp_t' | 'comprobante_domicilio_t') {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      if (!this.documentosTestigos[index]) {
        this.documentosTestigos[index] = {};
      }
      this.documentosTestigos[index][tipo] = fileInput.files[0];
    }
  }

  eliminarArchivoTestigos(index: number, tipo: 'identificacion_t' | 'curp_t' | 'comprobante_domicilio_t', inputEl: HTMLInputElement) {
    if (this.documentosTestigos[index]) {
      this.documentosTestigos[index][tipo] = null;
    }
    inputEl.value = '';
  }

  private reindexarArchivos() {
    const nuevosArchivos: typeof this.documentosTestigos = {};
    this.testigosF.controls.forEach((_, i) => {
      nuevosArchivos[i] = this.documentosTestigos[i] ?? {};
    });
    this.documentosTestigos = nuevosArchivos;
  }

 //PARA AGREGAR HEREDERO SUSTITUTO
  get herederoSustit(): FormArray {
    return this.formTestamento.get('herederoSustituto') as FormArray;
  }

  agregarSustituto(): void {
    const HerederoSustitutoGroup = this.fb.group({
        nombre_sustituto: ['', Validators.required],
        primer_apellido_sustituto: ['', Validators.required],
        segundo_apellido_sustituto: ['', Validators.required],
        nombre_a_sustituir: ['', Validators.required],
        primer_apellido_a_sustituir: ['', Validators.required],
        segundo_apellido_a_sustituir: ['', Validators.required]
    });
    this.herederoSustit.push(HerederoSustitutoGroup);
  }

  eliminarSustituto(index: number): void {
    this.herederoSustit.removeAt(index);
  }
  //****************************************************************************
  //****************************************************************************


 //PARA AGREGAR HEREDERO
  get herederos(): FormArray {
    return this.formTestamento.get('herederoAdd') as FormArray;
  }

  agregarHeredero(): void {
    const HerederoGroup = this.fb.group({
        nombre_heredero: ['', Validators.required],
        primer_apellido_heredero: ['', Validators.required],
        segundo_apellido_heredero: ['', Validators.required],
        edad_heredero: ['', Validators.required],
        parentesco_heredero: ['', Validators.required],
        porcentaje_heredero: ['', Validators.required],
    });
    this.herederos.push(HerederoGroup);
  }

  eliminarHeredero(index: number): void {
    this.herederos.removeAt(index);
  }
  //****************************************************************************
  //****************************************************************************

  //PARA AGREGAR O ELIMINAR HIJOS PRIMER MATRIMONIO
  get hijos(): FormArray {
    return this.formTestamento.get('hijosPrimer') as FormArray;
  }
  agregarHijo(): void {
    const hijoPrimernGroup = this.fb.group({
      hijo_nombre_primer_nup: [''],
      hijo_primer_apellido_primer_nup: [''],
     hijo_segundo_apellido_primer_nup: [''],
     hijo_edad_primer_nup: [''],
     hijo_vf_primer_nup: ['']
    });
    this.hijos.push(hijoPrimernGroup);
  }

 eliminarHijo(index: number): void {
    this.hijos.removeAt(index);
  }
  //****************************************************************************
  //****************************************************************************






  //PARA AGREGAR O ELIMINAR HIJOS SEGUNDO MATRIMONIO
  get hijosDos(): FormArray {
    return this.formTestamento.get('hijosSegundo') as FormArray;
  }
  agregarDosHijo(): void {
    const hijoDosnGroup = this.fb.group({
      hijo_nombre_dos_nup: [''],
      hijo_primer_apellido_dos_nup: [''],
      hijo_segundo_apellido_dos_nup: [''],
      hijo_edad_dos_nup: [''],
      hijo_vf_dos_nup: ['']
    });
    this.hijosDos.push(hijoDosnGroup);
  }

 eliminarDosHijo(index: number): void {
    this.hijosDos.removeAt(index);
  }
  //****************************************************************************
  //****************************************************************************


  //PARA AGREGAR O ELIMINAR HIJOS FUERA MATRIMONIO
  get hijosFuera(): FormArray {
    return this.formTestamento.get('hijosFueraMatrim') as FormArray;
  }
  agregarFueraHijo(): void {
    const hijoFueraGroup = this.fb.group({
      fuera_hijo_nombre: [''],
      fuera_hijo_primer_apellido: [''],
     fuera_hijo_segundo_apellido: [''],
     fuera_hijo_edad: [''],
      fuera_hijo_vf: ['']
    });
    this.hijosFuera.push(hijoFueraGroup);
  }

 eliminarFueraHijo(index: number): void {
    this.hijosFuera.removeAt(index);
  }
  //****************************************************************************
  //****************************************************************************



  //PARA LOS SELECT DE NACIONALIDAD, MOSTRAR U OCULTAR LOS INPUT OTRO
  initToggle(toggleControlName: string, targetControlName: string) {
    this.formTestamento.get(toggleControlName)!.valueChanges.subscribe((val) => {
      const targetControl = this.formTestamento.get(targetControlName)!;
      if (val === '0') {
        targetControl.enable();
      } else {
        targetControl.disable();
      }
    });
  }
  mostrarCampo(controlName: string): boolean {
    return this.formTestamento.get(controlName)?.value === '0';
  }
  //****************************************************************************************** */

  ngOnInit(): void {
    this.modalService.open(this.xlModal, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
    this.currentUser = this._userService.currentUserValue;
    console.log('Usuario Logueado:', this.currentUser);
    this.buscarDatosPorCurp(this.currentUser.rfc);
  
  }

  //PARA MOSTRAR EL DIV EN CASO DE QUE HAYA TESTIGOS
  // toggleExtraInfo(): void {
  //     this.mostrarExtraInfo = !this.mostrarExtraInfo;
  //     if (this.mostrarExtraInfo) {
  //       this.testigos =true;
  //     } else {
  //       this.testigos =false;
  //     }
  //   }
  //PARA OBTENER LAS LOCALIDADES DEPENDIENDO DEL CODIGO POSTAL
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
  //PARA GUARDAR TEMPORALMENTE LOS ARCHIVOS QUE SE SELECCIONAN
  onFileSelect(event: Event, campo: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.documentos[campo] = input.files[0];
    }  
  }
  //PARA BORRAR  LOS ARCHIVOS QUE SE GUARDARON TEMPORALMENTE
  eliminarArchivo(campo: string, inputRef: HTMLInputElement): void {
    delete this.documentos[campo]; 
    this.documentos[campo] = null;  
    inputRef.value = '';
  }
  //PARA LLENAR LOS DATOS DEL USUARIO DEPENDIENDO DEL CURP
  buscarDatosPorCurp(curp: string) {
      this.limpiaForm();
      this.msgcurp = curp;
      console.log(curp);
      this._registroService.getDatosUser(this.msgcurp).subscribe({
        next: (response: any) => {

          this.datos_personales = response.data
          if(response.solicitud){
            this.estatusSolicitud = true;
          }
          this.estadoCivilArray = [
            { id: '', name: '--Selecciona--' },
            ...response.estadocivil.map((item: { id: number; estado_civil: string }) => ({
              id: item.id,
              name: item.estado_civil
            }))
          ];
          this.formTestamento.patchValue({
            f_curp: response.data.f_curp,
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
          if(response.data.estadocivil_id){
            const estado_civil = response.data.estadocivil_id;
            this.formTestamento.get('estado_civil')?.setValue(estado_civil);
           
          }
          if (response.data.f_fecha_nacimiento) {
            const edad = this.calcularEdad(response.data.f_fecha_nacimiento);
            if(edad > 60){
              this.mostrarExtraInfo = !this.mostrarExtraInfo;
                if (this.mostrarExtraInfo) {
                  this.testigos =true;
                } else {
                  this.testigos =false;
                }
            }
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
  
  

  //PARA LLENAR LA EDAD TOMANDO LA FECHA DE NACIMIENTO
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

  
  //PARA QUE SE HAGAN REQUERIDOS LOS INPUT DE LOS PRIMEROS DOCUMENTOS
  documentosRequeridosLlenos(): boolean {
    return this.documentos.acta_nacimiento !== null &&
          this.documentos.ine !== null &&
          this.documentos.comprobante_domicilio !== null &&
          this.documentos.constancia_situacion_fiscal !== null &&
          this.documentos.curp !== null;
  }
  //PARA QUE SE HAGAN REQUERIDOS LOS INPUT DE LOS TESTIGOS EN CASO DE QUE SE CUMPLA LA CONDICION
  documentosExtraRequeridosLlenos(): boolean {
    return this.documentos.certificado_publico !== null &&
          this.documentos.certificado_privado !== null;
          // this.documentos.t1_identificacion !== null &&
          // this.documentos.t1_curp !== null &&
          // this.documentos.t1_comprobante_domicilio !== null &&
          // this.documentos.t2_identificacion !== null &&
          // this.documentos.t2_curp !== null &&
          // this.documentos.t2_comprobante_domicilio !== null &&
          // this.documentos.t3_identificacion !== null &&
          // this.documentos.t3_curp !== null &&
          // this.documentos.t3_comprobante_domicilio !== null;
  }

  //GUARDA DATOS
  enviarDatos(): void {

    if (!this.formTestamento.valid || !this.documentosRequeridosLlenos()) {
      this.formTestamento.markAllAsTouched();
      Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡Atención!",
            text: "Todos los campos señalados con un asterisco (*) son obligatorios. Es necesario completarlos para el correcto envío de la información.",
            showConfirmButton: false,
            timer: 3000
      });
      return;
    }
    if (this.testigos && !this.documentosExtraRequeridosLlenos()) {
          Swal.fire({
                position: "center",
                icon: "warning",
                title: "¡Atención!",
                text: "Todos los campos señalados con un asterisco (*) son obligatorios. Es necesario completarlos para el correcto envío de la información.",
                showConfirmButton: false,
                timer: 3000
              });
        return;
    }

    const formData = new FormData();
    formData.append('f_rfc', String(this.formTestamento.value.f_rfc));
    formData.append('f_curp', String(this.formTestamento.value.f_curp));
    formData.append('f_nombre', String(this.formTestamento.value.f_nombre));
    formData.append('f_primer_apellido', String(this.formTestamento.value.f_primer_apellido));
    formData.append('f_segundo_apellido', String(this.formTestamento.value.f_segundo_apellido));
    formData.append('f_fecha_nacimiento', String(this.formTestamento.value.f_fecha_nacimiento));
    formData.append('lugar_nacimiento', String(this.formTestamento.value.lugar_nacimiento));
    formData.append('f_cp', String(this.formTestamento.value.f_cp));
    formData.append('estado_id', String(this.formTestamento.value.estado_id));
    formData.append('municipio_id', String(this.formTestamento.value.municipio_id));
    formData.append('colonia_id', String(this.formTestamento.value.colonia_id));
    formData.append('f_domicilio', String(this.formTestamento.value.f_domicilio));
    formData.append('numext', String(this.formTestamento.value.numext));
    formData.append('numero_tel', String(this.formTestamento.value.numero_tel));
    formData.append('numero_cel', String(this.formTestamento.value.numero_cel));
    formData.append('correo_per', String(this.formTestamento.value.correo_per));
    formData.append('estado_civil', this.formTestamento.value.estado_civil);

    formData.append('documento_identifica', String(this.formTestamento.value.documento_identifica));
    if(this.formTestamento.value.documento_identifica =='Pasaporte' || this.formTestamento.value.documento_identifica =='Cédula profesional'){
      formData.append('numero_documento_identifica', String(this.formTestamento.value.numero_documento_identifica));
    }

    formData.append('nacionalidad_serv', String(this.formTestamento.value.nacionalidad_serv));
    if(this.formTestamento.value.nacionalidad_serv =='0'){
          formData.append('indique_nacionalidad_serv', String(this.formTestamento.value.indique_nacionalidad_serv));
          formData.append('documento_residencia_serv', String(this.formTestamento.value.documento_residencia_serv));       
    }

    formData.append('f_nombre_padre', String(this.formTestamento.value.f_nombre_padre));
    formData.append('f_primer_apellido_padre', String(this.formTestamento.value.f_primer_apellido_padre));
    formData.append('f_segundo_apellido_padre', String(this.formTestamento.value.f_segundo_apellido_padre));
    formData.append('vive_padre', String(this.formTestamento.value.vive_padre));
    formData.append('nacionalidad_padre', String(this.formTestamento.value.nacionalidad_padre));
    if(this.formTestamento.value.nacionalidad_padre =='0'){
      formData.append('especifique_nac_padre', String(this.formTestamento.value.especifique_nac_padre)); 
    }


    formData.append('f_nombre_madre', String(this.formTestamento.value.f_nombre_madre));
    formData.append('f_primer_apellido_madre', String(this.formTestamento.value.f_primer_apellido_madre));
    formData.append('f_segundo_apellido_pmadre', String(this.formTestamento.value.f_segundo_apellido_pmadre));
    formData.append('vive_madre', String(this.formTestamento.value.vive_madre));
    formData.append('nacionalidad_madre', String(this.formTestamento.value.nacionalidad_madre));
    if(this.formTestamento.value.nacionalidad_madre == '0'){
      formData.append('especifique_nac_madre', String(this.formTestamento.value.especifique_nac_madre)); 
    }



    formData.append('nombre_primer_nup', String(this.formTestamento.value.nombre_primer_nup));
    formData.append('primer_apellido_primer_nup', String(this.formTestamento.value.primer_apellido_primer_nup));
    formData.append('segundo_apellido_primer_nup', String(this.formTestamento.value.segundo_apellido_primer_nup));
    formData.append('vive_primer_nup', String(this.formTestamento.value.vive_primer_nup));
    formData.append('regimen_patrimonial_primer_nup', String(this.formTestamento.value.regimen_patrimonial_primer_nup));
    if (this.hijos.length > 0) {
      this.hijos.controls.forEach((control, index) => {
        const hijo = control.value;
        Object.keys(hijo).forEach(key => {
          formData.append(`hijosPrimerMatrimonio[${index}][${key}]`, hijo[key]);
        });
      });
    }


    formData.append('nombre_dos_nup', String(this.formTestamento.value.nombre_dos_nup));
    formData.append('primer_apellido_dos_nup', String(this.formTestamento.value.primer_apellido_dos_nup));
    formData.append('segundo_apellido_dos_nup', String(this.formTestamento.value.segundo_apellido_dos_nup));
    formData.append('vive_dos_nup', String(this.formTestamento.value.vive_dos_nup));
    formData.append('regimen_patrimonial_dos_nup', String(this.formTestamento.value.regimen_patrimonial_dos_nup));
    if (this.hijosDos.length > 0) {
      this.hijosDos.controls.forEach((control, index) => {
        const hijo2 = control.value;
        Object.keys(hijo2).forEach(key => {
          formData.append(`hijosSegundoMatrimonio[${index}][${key}]`, hijo2[key]);
        });
      });
    }

    formData.append('nombre_fuera_matri', String(this.formTestamento.value.nombre_fuera_matri));
    formData.append('primer_apellido_fuera_matri', String(this.formTestamento.value.primer_apellido_fuera_matri));
    formData.append('segundo_apellido_fuera_matri', String(this.formTestamento.value.segundo_apellido_fuera_matri));
    if (this.hijosFuera.length > 0) {
      this.hijosFuera.controls.forEach((control, index) => {
        const hijoF = control.value;
        Object.keys(hijoF).forEach(key => {
          formData.append(`hijosFueraMatrimonio[${index}][${key}]`, hijoF[key]);
        });
      });
    }

    formData.append('primer_testamento', String(this.formTestamento.value.primer_testamento));
    formData.append('fecha_primer_testamento', String(this.formTestamento.value.fecha_primer_testamento));
    formData.append('notaria_primer_testamento', String(this.formTestamento.value.notaria_primer_testamento));
    formData.append('instrumento_primer_testamento', String(this.formTestamento.value.instrumento_primer_testamento));

    
    formData.append('sabe_leer', String(this.formTestamento.value.sabe_leer));
    formData.append('sabe_escribir', String(this.formTestamento.value.sabe_escribir));
    formData.append('puede_hablar', String(this.formTestamento.value.puede_hablar));
    formData.append('puede_ver', String(this.formTestamento.value.puede_ver));
    formData.append('puede_oir', String(this.formTestamento.value.puede_oir));
    formData.append('presenta_dificultad', String(this.formTestamento.value.presenta_dificultad));
    if (this.testigosF.length > 0) {
      // Agregar datos de los testigos
      this.testigosF.controls.forEach((control, index) => {
        const testigo = control.value;
        // Agregar cada campo del testigo al FormData
        Object.keys(testigo).forEach(key => {
          const formKey = `testigos[${index}][${key}]`;
          formData.append(formKey, testigo[key]);
        });
        // Agregar los archivos asociados (si existen)
        const archivos = this.documentosTestigos[index];
        if (archivos) {
          if (archivos.identificacion_t) {
            formData.append(`testigos[${index}][identificacion_t]`, archivos.identificacion_t);
          }
          if (archivos.curp_t) {
            formData.append(`testigos[${index}][curp_t]`, archivos.curp_t);
          }
          if (archivos.comprobante_domicilio_t) {
            formData.append(`testigos[${index}][comprobante_domicilio_t]`, archivos.comprobante_domicilio_t);
          }
        }
      });
    }

    formData.append('menor_de_edad', String(this.formTestamento.value.menor_de_edad));

    formData.append('nombre_tutor', String(this.formTestamento.value.nombre_tutor));
    formData.append('primer_apellido_tutor', String(this.formTestamento.value.primer_apellido_tutor));
    formData.append('segundo_apellido_tutor', String(this.formTestamento.value.segundo_apellido_tutor));
    formData.append('nombre_tutor_sustituto', String(this.formTestamento.value.nombre_tutor_sustituto));
    formData.append('primer_apellido_tutor_sustituto', String(this.formTestamento.value.primer_apellido_tutor_sustituto));
    formData.append('segundo_apellido_tutor_sustituto', String(this.formTestamento.value.segundo_apellido_tutor_sustituto));

    formData.append('nombre_curador', String(this.formTestamento.value.nombre_curador));
    formData.append('primer_apellido_curador', String(this.formTestamento.value.primer_apellido_curador));
    formData.append('segundo_apellido_curador', String(this.formTestamento.value.segundo_apellido_curador));
    formData.append('nombre_a_su_falta_curador', String(this.formTestamento.value.nombre_a_su_falta_curador));
    formData.append('primer_apellido_a_su_falta_curador', String(this.formTestamento.value.primer_apellido_a_su_falta_curador));
    formData.append('segundo_apellido_a_su_falta_curador', String(this.formTestamento.value.segundo_apellido_a_su_falta_curador));

    formData.append('derecho_acrecer', String(this.formTestamento.value.derecho_acrecer));
    if (this.herederos.length > 0) {
        this.herederos.controls.forEach((control, index) => {
        const herederos1 = control.value;
        Object.keys(herederos1).forEach(key => {
          formData.append(`herederos[${index}][${key}]`, herederos1[key]);
        });
      });
    }
    formData.append('derecho_acrecer_sustituto', String(this.formTestamento.value.derecho_acrecer_sustituto));

    if (this.herederoSustit.length > 0) {
      this.herederoSustit.controls.forEach((control, index) => {
        const herederosus = control.value;
        Object.keys(herederosus).forEach(key => {
          formData.append(`herederoSustituto[${index}][${key}]`, herederosus[key]);
        });
      });
    }

    formData.append('nombre_albacea', String(this.formTestamento.value.nombre_albacea));
    formData.append('primer_apellido_albacea', String(this.formTestamento.value.primer_apellido_albacea));
    formData.append('segundo_apellido_albacea', String(this.formTestamento.value.segundo_apellido_albacea));
    formData.append('nombre_falta_albacea', String(this.formTestamento.value.nombre_falta_albacea));
    formData.append('primer_apellido_falta_albacea', String(this.formTestamento.value.primer_apellido_falta_albacea));
    formData.append('segundo_apellido_falta_albacea', String(this.formTestamento.value.segundo_apellido_falta_albacea));



    for (const key in this.documentos) {
      if (this.documentos[key]) {
        console.log(key)
        formData.append(key, this.documentos[key] as File);
      }
    }
    // if (this.formTestamento.valid) {
    //   console.log('Formulario enviado:', this.formTestamento.value);
    // } else {
    //   console.log('Formulario no válido');
    // }
    //formData.append('testigos', String(this.testigos));
    /*formData.forEach((valor, clave) => {
      console.log(clave, valor);
    });*/
    const curpUsr = this.formTestamento.value.f_curp;
    this._registroService.saveRegistro(formData,curpUsr).subscribe({
      next: (response: any) => {
        Swal.fire({
          position: "center", 
          icon: "success",
          title: "¡Registro exitoso!",
          text: `El registro de su trámite testamentario se ha efectuado de manera satisfactoria. Se le solicita mantenerse atento a los medios de contacto proporcionados, ya que en breve será contactado(a) para dar seguimiento y continuidad al procedimiento correspondiente.`,
          showConfirmButton: false,
          timer: 7000
        }).then(() => {
          this.mostrarFormulario = false;
          this.estatusSolicitud = true;         
        });
      },
      error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
           console.error('Error desconocido:', e);
              Swal.fire({
            position: "center",
            icon: "error",
            title: "¡Atención!",
            text: `Error al guardar, consulte al administrador del sistema.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
    })
  }

  onLogout(e: Event) {
      e.preventDefault();

      localStorage.setItem('isLoggedin', 'false');
      localStorage.removeItem('myToken')
      localStorage.removeItem('currentUser')
      if (localStorage.getItem('isLoggedin') === 'false') {
        this.router.navigate(['/auth/login']);
      }
  }

  //LIMPIAR FORMULARIO Y ESTADO DE INPUTS
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
      control?.setValue(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
    this.formTestamento.patchValue({
      colonia_id:'',
      municipio_id: '',
      estado_nombre: '',
      municipio_nombre: ''
    });
    this.localidades = [];
  }
  
}
