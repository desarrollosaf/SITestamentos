import { Request, Response, NextFunction } from 'express'
import Solicitud from '../models/solicitud';
import User from '../models/user';
import bcrypt from 'bcrypt'
import Testigo  from '../models/testigos';
import sequelizefun from '../database/fun'; // La conexión
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import path from 'path';
import Documento from '../models/documentos';
import TipoDocumento from '../models/tipos_documentos';
import Padre from '../models/padres';
import Matrimonio from '../models/matrimonios';
import Hijos from '../models/hijos';
import TestamentoPasados from '../models/testamentos_pasados';
import Heredero from '../models/herederos';
import HerederoSustituto from '../models/herederos_sustitutos';
import testigos from '../models/testigos';
import Albacea from '../models/albaceas';
import TutorDescendiente from '../models/tutor_descendientes';
import Hijo from '../models/hijos';
import dp_estado_civil from '../models/fun/dp_estado_civil';
import { Op } from 'sequelize'; 

dp_datospersonales.initModel(sequelizefun);

export const saveinfo = async (req: Request, res: Response): Promise<any> => {
    const data  = req.body;
    console.log('save');
    console.log(data);
    const Upassword = data.f_rfc;
    const UpasswordHash = await bcrypt.hash(Upassword, 10);
    /*const newUser = await User.create({
      name:  data.f_rfc,
      email:  data.correo_per,
      password: UpasswordHash,
    });*/

    let registro = await dp_datospersonales.findOne({ 
        where: { f_curp: data.f_curp }
    });
    if (!registro) {
         const test = await dp_datospersonales.create({
             f_curp: data.f_curp,
             f_rfc: data.f_rfc,
             f_nombre: data.f_nombre,
             f_primer_apellido: data.f_primer_apellido,
             f_segundo_apellido: data.f_segundo_apellido,
             f_fecha_nacimiento: data.f_fecha_nacimiento,
             estado_id: data.estado_id,
             municipio_id: data.municipio_id,
             colonia_id: data.colonia_id,
             f_domicilio: data.f_domicilio,
             numext: data.numext,
             numero_tel: data.numero_tel,
             numero_cel: data.numero_cel,
             correo_per: data.correo_per,
             f_homclave: '',
             f_cp: data.f_cp,
             estadocivil_id: data.estado_civil
        
         });    
    }else{
            await registro.update({
             f_curp: data.f_curp,
             f_rfc: data.f_rfc,
             f_nombre: data.f_nombre,
             f_primer_apellido: data.f_primer_apellido,
             f_segundo_apellido: data.f_segundo_apellido,
             f_fecha_nacimiento: data.f_fecha_nacimiento,
             estado_id: data.estado_id,
             municipio_id: data.municipio_id,
             colonia_id: data.colonia_id,
             f_domicilio: data.f_domicilio,
             numext: data.numext,
             numero_tel: data.numero_tel,
             numero_cel: data.numero_cel,
             correo_per: data.correo_per,
             f_homclave: '',
             f_cp: data.f_cp,
             estadocivil_id: data.estado_civil
            });
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const f_curp = data.f_curp;

    const buildPath = (field: string): string | null => {
        const file = files[field]?.[0];
        return file ? path.join('storage', f_curp, file.filename) : null;
    };

    let solicitud: any | null = null;
    try {
        solicitud = await Solicitud.create({
            userId: data.f_rfc,
            es_primer_testamento: data.primer_testamento,
            sabe_leer: data.sabe_leer,
            sabe_escribir: data.sabe_escribir,
            puede_hablar: data.puede_hablar,
            puede_ver: data.puede_ver,
            puede_oir: data.puede_oir,
            heredero_menor_edad: data.menor_de_edad,  
            documento_identifica: data.documento_identifica,
            numero_documento_identifica: data.numero_documento_identifica,
            nacionalidad: data.nacionalidad_serv,
            indique_nacionalidad_serv: data.indique_nacionalidad_serv,
            documento_residencia: data.documento_residencia_serv,
            dificultad_comunicacion:  data.presenta_dificultad,
            lugar_nacimiento: data.lugar_nacimiento,
            estatus_solicitud: 1,
        });    
    } catch (error) {
        console.error('❌ Error al crear la solicitud:', error);

    }
    //const solicitud = await Solicitud.create(solicituddata);

    const documentosFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
        'ine', 'comprobante_residencia', 'constancia_situacion_fiscal'
    ];

    const documentosPaths: { [key: string]: string | null } = {};

    for (const field of documentosFields) {
    const filePath = buildPath(field);
    documentosPaths[field] = filePath;
        if (filePath) {
        const tipodoc = await TipoDocumento.findOne({
            where: { tipo: field } 
        });
        if (!tipodoc) {
            throw new Error(`TipoDocumento no encontrado para tipo: ${field}`);
        }
            await Documento.create({
            solicitudId: solicitud.id,
            tipo_documento: tipodoc.id,
            archivo_path: filePath,
            });
        }
    }
    try {
    const padre = await Padre.create({
        solicitudId: solicitud.id,
        tipo: '1',
        nombre: data.f_nombre_padre,
        primer_apellido: data.f_primer_apellido_padre,
        segundo_apellido: data.f_segundo_apellido_padre,
        vive: data.vive_padre,
        nacionalidad: data.nacionalidad_padre,
        especifique_nacionalidad: data.especifique_nac_padre,
    });
    } catch (error) {
        console.error('❌ Error al crear el padre :', error);

    }
    const madre = await Padre.create({
        solicitudId: solicitud.id,
        tipo: '2',
        nombre: data.f_nombre_madre,
        primer_apellido: data.f_primer_apellido_madre,
        segundo_apellido: data.f_segundo_apellido_pmadre,
        vive: data.vive_madre,
        nacionalidad: data.nacionalidad_madre,
        especifique_nacionalidad: data.especifique_nac_madre,
    });

   
        const primerasnupcias = await Matrimonio.create({
            solicitudId: solicitud.id,
            orden: 1,
            nombre: data.nombre_primer_nup,
            primer_apellido:  data.primer_apellido_primer_nup,
            segundo_apellido:  data.segundo_apellido_primer_nup,
            regimen_patrimonial: data.regimen_patrimonial_primer_nup,
            vive: data.vive_primer_nup,
            
        });
    

    
        if(data.hijosPrimerMatrimonio){
            for (const hijosprimer of data.hijosPrimerMatrimonio) {
                const hijosprimerasnupcias = await Hijos.create({
                    solicitudId: solicitud.id,
                    matrimonioId: primerasnupcias.id,
                    nombre: hijosprimer.hijo_nombre_primer_nup,
                    primer_apellido: hijosprimer.hijo_primer_apellido_primer_nup,
                    segundo_apellido: hijosprimer.hijo_segundo_apellido_primer_nup,
                    edad: hijosprimer.hijo_edad_primer_nup,
                    vive: hijosprimer.hijo_vf_primer_nup,
                    reconocido: true,
                    fuera_de_matrimonio: false,
                    nombre_fuera: '',
                    primer_apellido_fuera_matri: '',
                    segundo_apellido_fuera_matri: ''
                });
            }
        }
    if(data.nombre_dos_nup){
          let segundasnupcias = await Matrimonio.create({
            solicitudId: solicitud.id,
            orden: 2,
            nombre: data.nombre_dos_nup,
            primer_apellido:  data.primer_apellido_dos_nup,
            segundo_apellido:  data.segundo_apellido_dos_nup,
            regimen_patrimonial: data.regimen_patrimonial_dos_nup,
            vive: data.vive_dos_nup,
        });
        if(data.hijosSegundoMatrimonio){
            for (const hijossegundos of data.hijosSegundoMatrimonio) {
                const hijossegundasnupcias = await Hijos.create({
                    solicitudId: solicitud.id,
                    matrimonioId: segundasnupcias.id,
                    nombre: hijossegundos.hijo_nombre_dos_nup,
                    primer_apellido: hijossegundos.hijo_primer_apellido_dos_nup,
                    segundo_apellido: hijossegundos.hijo_segundo_apellido_dos_nup,
                    edad: hijossegundos.hijo_edad_dos_nup,
                    vive: hijossegundos.hijo_vf_dos_nup,
                    reconocido: true,
                    fuera_de_matrimonio: false,
                    nombre_fuera: '',
                    primer_apellido_fuera_matri: '',
                    segundo_apellido_fuera_matri: ''
                });
            }
        }
    }

   try {

        if(data.hijosFueraMatrimonio){
            for (const hijosfuera of data.hijosFueraMatrimonio) {
                const hijosfueramatrimonio = await Hijos.create({
                    solicitudId: solicitud.id,
                    nombre: hijosfuera.fuera_hijo_nombre,
                    primer_apellido: hijosfuera.fuera_hijo_primer_apellido,
                    segundo_apellido: hijosfuera.fuera_hijo_segundo_apellido,
                    edad: hijosfuera.fuera_hijo_edad,
                    vive: hijosfuera.fuera_hijo_vf,
                    reconocido: false,
                    fuera_de_matrimonio: true,
                    nombre_fuera: data.nombre_fuera_matri,
                    primer_apellido_fuera_matri: data.primer_apellido_fuera_matri,
                    segundo_apellido_fuera_matri: data.segundo_apellido_fuera_matri

                });
            }
        }
    } catch (error) {
        console.error('❌ Error al crear el bastardo :', error);

    }
     try {
        if(data.primer_testamento == false){
            const tienetestamento = await TestamentoPasados.create({
                solicitudId: solicitud.id,
                fecha_tramite: data.fecha_primer_testamento,
                notaria: data.notaria_primer_testamento,
                instrumento_volumen: data.instrumento_primer_testamento,
                path_testamento: buildPath(`primer_testamento_doc`),
            });
        }
    } catch (error) {
        console.error('❌ Error al crear el TESTAMENTO :', error);

    }
    try {
        if(data.herederos){
            for (const heredero of data.herederos) {
                const herederos = await Heredero.create({
                    solicitudId: solicitud.id,
                    nombre_heredero: heredero.nombre_heredero,
                    primer_apellido_heredero: heredero.primer_apellido_heredero,
                    segundo_apellido_heredero: heredero.segundo_apellido_heredero,
                    porcentaje: heredero.porcentaje_heredero,
                    edad: heredero.edad_heredero,
                    parentesco: heredero.parentesco_heredero,
                    derecho_acrecer: data.derecho_acrecer,
                
                });
            }  
        }
     } catch (error) {
        console.error('❌ Error al crear el HEREDEROS :', error);

    }

     if(data.herederoSustituto){
         for (const herederosustituto of data.herederoSustituto) {
            const herederosustitut = await HerederoSustituto.create({
                solicitudId: solicitud.id,
                nombre_sustituto: herederosustituto.nombre_sustituto,
                primer_apellido_sustituto: herederosustituto.primer_apellido_sustituto,
                segundo_apellido_sustituto: herederosustituto.segundo_apellido_sustituto,
                nombre_a_sustituir: herederosustituto.nombre_a_sustituir,
                primer_apellido_a_sustituir: herederosustituto.primer_apellido_a_sustituir,
                segundo_apellido_a_sustituir: herederosustituto.segundo_apellido_a_sustituir,
                derecho_acrecer: data.derecho_acrecer_sustituto
            });
         }  
    }

    const albacea = await Albacea.create({
                solicitudId: solicitud.id,
                nombre_albacea: data.nombre_albacea,
                primer_apellido_albacea: data.primer_apellido_albacea,
                segundo_apellido_albacea: data.segundo_apellido_albacea,
                nombre_falta_albacea: data.nombre_falta_albacea,
                primer_apellido_falta_albacea: data.primer_apellido_falta_albacea,
                segundo_apellido_falta_albacea: data.segundo_apellido_falta_albacea,
    });

    if(data.menor_de_edad == 1){
        const tutor = await TutorDescendiente.create({
                solicitudId: solicitud.id,
                nombre_tutor: data.nombre_tutor,
                primer_apellido_tutor: data.primer_apellido_tutor,
                segundo_apellido_tutor: data.segundo_apellido_tutor,
                nombre_tutor_sustituto: data.nombre_tutor_sustituto,
                primer_apellido_tutor_sustituto: data.primer_apellido_tutor_sustituto,
                segundo_apellido_tutor_sustituto: data.segundo_apellido_tutor_sustituto,
                nombre_curador: data.nombre_curador,
                primer_apellido_curador:  data.primer_apellido_curador,
                segundo_apellido_curador: data.segundo_apellido_curador,
                nombre_a_su_falta_curador: data.nombre_a_su_falta_curador,
                primer_apellido_a_su_falta_curador: data.primer_apellido_a_su_falta_curador,
                segundo_apellido_a_su_falta_curador: data.segundo_apellido_a_su_falta_curador
        });
    }
    
    const buildIndexedPath = (field: string, index: number): string | null => {
        const fullFieldName = `testigos[${index}][${field}]`; 
        const file = files[fullFieldName]?.[0];
        return file ? path.join('storage', data.f_curp, file.filename) : null;
    };

    try {
        if (data.testigos) {
            for (let i = 0; i < data.testigos.length; i++) {
                const itemtest = data.testigos[i];

                const testig = await Testigo.create({
                solicitudId: solicitud.id,
                nombre_testigo: itemtest.nombre_testigo,
                primer_apellido_testigo: itemtest.primer_apellido_testigo,
                segundo_apellido_testigo: itemtest.segundo_apellido_testigo,
                nacionalidad: itemtest.nacionalidad_testigo,
                fecha_naciento: itemtest.fecha_nacimiento_testigo,
                lugar_nacimiento: itemtest.lugar_nacimiento_testigo,
                curp_dato: itemtest.curp_testigo,
                estado_civil: itemtest.estado_civil_testigo,
                ocupacion: itemtest.ocupacion_testigo,
                domicilio: itemtest.domicilio_testigo,
                cp: itemtest.cp_testigo,
                telefono: itemtest.telefono_testigo,
                rfc: itemtest.rfc_testigo,
                identificacion: buildIndexedPath('identificacion_t', i),
                curp: buildIndexedPath('curp_t', i),
                comprobante_domicilio: buildIndexedPath('comprobante_domicilio_t', i)
                });
            }
        }
    } catch (error) {
        console.error('Error al crear el HEREDEROS :', error);

    }
    return res.status(200).json({
        message: 'Documento guardado exitosamente'
    });
};



export const getsolicitudes = async (req: Request, res: Response): Promise<any> => {
    try {
        let solicitudes = await Solicitud.findAll({
            include: [
                {
                model: Testigo,
                as: 'testigos',
                },
            ],
        });
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);

                const datos = await dp_datospersonales.findOne({
                where: { f_rfc: solicitud.userId },
                });

                if (datos) {
                solicitud.setDataValue('datos_user', datos);
                }
            }
        }
        if (solicitudes.length > 0) {
            return res.json(solicitudes);
        } else {
            return res.status(404).json({ msg: `Sin datos` });
        }
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const getsolicitud = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    try {
        const whereCondition = isUUID ? { id } : { userId: id };
        console.log(whereCondition);
        let solicitudes = await Solicitud.findAll({
            where:  whereCondition ,
                include: [
                    {
                        model: Testigo,
                        as: 'testigos',
                    },
                    {
                        model: Albacea,
                        as: 'albacea',
                    },
                    {
                        model: Documento,
                        as: 'documentos',
                        include: [
                            {
                            model: TipoDocumento,
                            as: 'tipo_doc',
                            },
                        ],
                    },
                    {
                        model: Heredero,
                        as: 'herederos',
                    },
                    {
                        model: HerederoSustituto,
                        as: 'herederos_susti',
                    },
                    {
                        model: Hijo,
                        as: 'hijos',
                    },
                    // Primeras nupcias (orden 1)
                    {
                        model: Matrimonio,
                        as: 'primeras_nupcias',
                        where: { orden: 1 },
                        required: false,
                            include: [
                                {
                                model: Hijo,
                                as: 'hijos',
                                },
                            ],
                    },
                    // Segundas nupcias (orden 2)
                    {
                        model: Matrimonio,
                        as: 'segundas_nupcias',
                        where: { orden: 2 },
                        required: false,
                            include: [
                                {
                                model: Hijo,
                                as: 'hijos',
                                },
                            ],
                    },
                    {
                        model: Padre,
                        as: 'padres',
                    },
                    {
                        model: TestamentoPasados,
                        as: 'testamentos_pasados',
                    },
                    {
                        model: TutorDescendiente,
                        as: 'tutor_descendientes',
                    },
                    {
                        model: Hijo,
                        as: 'hijo_fuera',
                        where: { fuera_de_matrimonio: true },
                        required: false,
                    }
                ],
            });


        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);

                const datos = await dp_datospersonales.findOne({
                where: { f_rfc: solicitud.userId },
                });

                if (datos) {
                solicitud.setDataValue('datos_user', datos);
                }
            }
        }
        const civil = await dp_estado_civil.findAll();

        if (solicitudes) {
            // return res.json(solicitudes);
             return res.json({
                solicitud: solicitudes,
                estadocivil: civil
            });

        } else {
            return res.status(404).json({ msg: `No existe el id ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const getsolicitudesapi = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        let solicitudes = await Solicitud.findAll({
                include: [
                    {
                        model: Testigo,
                        as: 'testigos',
                    },
                    {
                        model: Albacea,
                        as: 'albacea',
                    },
                    {
                        model: Documento,
                        as: 'documentos',
                        include: [
                            {
                            model: TipoDocumento,
                            as: 'tipo_doc',
                            },
                        ],
                    },
                    {
                        model: Heredero,
                        as: 'herederos',
                    },
                    {
                        model: HerederoSustituto,
                        as: 'herederos_susti',
                    },
                    {
                        model: Hijo,
                        as: 'hijos',
                    },
                    // Primeras nupcias (orden 1)
                    {
                        model: Matrimonio,
                        as: 'primeras_nupcias',
                        where: { orden: 1 },
                        required: false,
                            include: [
                                {
                                model: Hijo,
                                as: 'hijos',
                                },
                            ],
                    },
                    // Segundas nupcias (orden 2)
                    {
                        model: Matrimonio,
                        as: 'segundas_nupcias',
                        where: { orden: 2 },
                        required: false,
                            include: [
                                {
                                model: Hijo,
                                as: 'hijos',
                                },
                            ],
                    },
                    {
                        model: Padre,
                        as: 'padres',
                    },
                    {
                        model: TestamentoPasados,
                        as: 'testamentos_pasados',
                    },
                    {
                        model: TutorDescendiente,
                        as: 'tutor_descendientes',
                    },
                    {
                        model: Hijo,
                        as: 'hijo_fuera',
                        where: { fuera_de_matrimonio: true },
                        required: false,
                    }
                ],
            });


        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            if (solicitud.userId) {
                console.log('Buscando datos personales para:', solicitud.userId);

                const datos = await dp_datospersonales.findOne({
                where: { f_rfc: solicitud.userId },
                });

                if (datos) {
                solicitud.setDataValue('datos_user', datos);
                }
            }
        }
    

        if (solicitudes) {
            // return res.json(solicitudes);
             return res.json({
                solicitudes: solicitudes,
            });

        } else {
            return res.status(404).json({ msg: `No existe el id ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

    ////////////////////////////////////////////////// CODIGO NUEVO ///////////////////////////////////////////////////////////////////////////////

const hashPassword = async (password: string) => bcrypt.hash(password, 10);


const buildPath = (files: any, field: string, curp: string) => {
  const file = files[field]?.[0];
  return file ? path.join('storage', curp, file.filename) : null;
};



export const saveprogreso = async (req: Request, res: Response): Promise<any> => {
 try {
    
    const data = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const f_curp = data.f_curp;
  const UpasswordHash = await hashPassword(data.f_rfc);
    //  console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",data)
    //  return 500;
  const cleanEmptyStrings = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v === '' || v === 'null' || v === 'undefined' || v === undefined) return [k, null];
      return [k, v];
    })
  );

  const upsert = async (model: any, where: any, values: any) => {
  const record = await model.findOne({ where });
  return record ? await record.update(values) : await model.create(values);
};

// --- Uso ---
const personalData = cleanEmptyStrings({
  f_curp: data.f_curp,
  f_rfc: data.f_rfc,
  f_nombre: data.f_nombre,
  f_primer_apellido: data.f_primer_apellido,
  f_segundo_apellido: data.f_segundo_apellido,
  f_fecha_nacimiento: data.f_fecha_nacimiento,
  estado_id: data.estado_id,
  municipio_id: data.municipio_id,
  colonia_id: data.colonia_id,
  f_domicilio: data.f_domicilio,
  numext: data.numext,
  numero_tel: data.numero_tel,
  numero_cel: data.numero_cel,
  correo_per: data.correo_per,
  f_homclave: '  ', 
  f_cp: data.f_cp,
  estadocivil_id: data.estado_civil,
});

await upsert(dp_datospersonales, { f_curp: data.f_curp }, personalData);

  // 2. Solicitud

  const cleanedData = cleanEmptyStrings({
    userId: data.f_rfc,
    es_primer_testamento: data.primer_testamento,
    sabe_leer: data.sabe_leer,
    sabe_escribir: data.sabe_escribir,
    puede_hablar: data.puede_hablar,
    puede_ver: data.puede_ver,
    puede_oir: data.puede_oir,
    heredero_menor_edad: data.menor_de_edad,
    documento_identifica: data.documento_identifica,
    numero_documento_identifica: data.numero_documento_identifica,
    nacionalidad: data.nacionalidad_serv,
    indique_nacionalidad_serv: data.indique_nacionalidad_serv,
    documento_residencia: data.documento_residencia_serv,
    dificultad_comunicacion: data.presenta_dificultad,
    lugar_nacimiento: data.lugar_nacimiento,
  });
  
  let solicitud = await Solicitud.findOne({ where: { userId: data.f_rfc } });
  if (!solicitud) {
    solicitud = await Solicitud.create(cleanedData);
  } else {
    await solicitud.update(cleanedData);
  }
 
  // 3. Documentos
  
  const documentosFields = [
    'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
    'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
    'ine', 'comprobante_residencia', 'constancia_situacion_fiscal'
  ];

  for (const field of documentosFields) {
    const filePath = buildPath(files, field, f_curp);
    if (!filePath) continue;

    const tipoDoc = await TipoDocumento.findOne({ where: { tipo: field } });
    if (!tipoDoc) continue;

    const existing = await Documento.findOne({ where: { solicitudId: solicitud.id, tipo_documento: tipoDoc.id } });
    if (existing) {
      await existing.update({ archivo_path: filePath });
    } else {
      await Documento.create({ solicitudId: solicitud.id, tipo_documento: tipoDoc.id, archivo_path: filePath });
    }
  } 


  // 4. Padres
  try {
    const upsertPadre = async (tipo: number, rawDataPadre: any) => {
        const dataPadre = cleanEmptyStrings(rawDataPadre);

        // Verifica si al menos un campo tiene un valor útil
        const tieneDatos = Object.values(dataPadre).some(
            (valor) => valor !== null && valor !== undefined
        );

        if (!tieneDatos) return; // Nada que guardar

        const where = { solicitudId: solicitud.id, tipo };
        await upsert(Padre, where, {
            ...dataPadre,
            solicitudId: solicitud.id,
            tipo: tipo.toString(),
        });
    };
   
  await upsertPadre(1, {
    nombre: data.f_nombre_padre,
    primer_apellido: data.f_primer_apellido_padre,
    segundo_apellido: data.f_segundo_apellido_padre,
    vive: data.vive_padre,
    nacionalidad: data.nacionalidad_padre,
    especifique_nacionalidad: data.especifique_nac_padre
  });

  await upsertPadre(2, {
    nombre: data.f_nombre_madre,
    primer_apellido: data.f_primer_apellido_madre,
    segundo_apellido: data.f_segundo_apellido_pmadre,
    vive: data.vive_madre,
    nacionalidad: data.nacionalidad_madre,
    especifique_nacionalidad: data.especifique_nac_madre
  });
   } catch (error) {
        console.error('Error al crear los HEREDEROS:', error);
    }


const upsertMatrimonio = async (orden: number, rawDatos: any) => {
  // Limpia strings vacíos o undefined
  const datos = cleanEmptyStrings(rawDatos);
  // Verificacion de datos null o 
  const tieneDatos = Object.values(datos).some(
    (valor) => valor !== null && valor !== undefined && valor !== ""
  );

  const where = { solicitudId: solicitud.id, orden };

  // validar si se tienen datos antes guardados para eliminar
  if (!tieneDatos) {
    const matrimonio = await Matrimonio.findOne({ where });
    if (matrimonio) {
      await Hijos.destroy({ where: { matrimonioId: matrimonio.id } });
      await matrimonio.destroy();
    }
    return null;
  }

  // Si sí tiene datos, hacer upsert
  const valores = {
    solicitudId: solicitud.id,
    orden,
    nombre: datos.nombre,
    primer_apellido: datos.primer_apellido,
    segundo_apellido: datos.segundo_apellido,
    regimen_patrimonial: datos.regimen_patrimonial,
    vive: datos.vive,
  };

  const matrimonio = await Matrimonio.findOne({ where });
  return matrimonio
    ? await matrimonio.update(valores)
    : await Matrimonio.create(valores);
};

const registrarHijosPorMatrimonio = async (matrimonioId: string, hijos: any[]) => {
  await Hijos.destroy({ where: { matrimonioId } });

  for (const hijoRaw of hijos) {
    const hijo = cleanEmptyStrings(hijoRaw);
    await Hijos.create({
      solicitudId: solicitud.id,
      matrimonioId,
      nombre: hijo.nombre,
      primer_apellido: hijo.primer_apellido,
      segundo_apellido: hijo.segundo_apellido,
      edad: hijo.edad,
      vive: hijo.vive,
      reconocido: true,
      fuera_de_matrimonio: false,
    });
  }
};

// Función para registrar hijos fuera del matrimonio
const registrarHijosFueraMatrimonio = async (hijos: any[]) => {
  await Hijos.destroy({ where: { solicitudId: solicitud.id, fuera_de_matrimonio: true } });

  for (const hijoRaw of hijos) {
    const hijo = cleanEmptyStrings(hijoRaw);

    const tieneDatos = Object.values(hijo).some((v) => v !== null && v !== undefined);
    if (!tieneDatos) continue;

    await Hijos.create({
      solicitudId: solicitud.id,
      nombre: hijo.nombre,
      primer_apellido: hijo.primer_apellido,
      segundo_apellido: hijo.segundo_apellido,
      edad: hijo.edad,
      vive: hijo.vive,
      reconocido: false,
      fuera_de_matrimonio: true,
      nombre_fuera: data.nombre_fuera_matri || null,
      primer_apellido_fuera_matri: data.primer_apellido_fuera_matri || null,
      segundo_apellido_fuera_matri: data.segundo_apellido_fuera_matri || null,
    });
  }
};

// === MATRIMONIO 1 ===
const matrimonio1 = await upsertMatrimonio(1, {
  nombre: data.nombre_primer_nup,
  primer_apellido: data.primer_apellido_primer_nup,
  segundo_apellido: data.segundo_apellido_primer_nup,
  regimen_patrimonial: data.regimen_patrimonial_primer_nup,
  vive: data.vive_primer_nup,
});

if (matrimonio1) {
  const hijosArray = Array.isArray(data.hijosPrimerMatrimonio) ? data.hijosPrimerMatrimonio : [];

  const hijos1 = hijosArray.map((h: any) => ({
    nombre: h.hijo_nombre_primer_nup,
    primer_apellido: h.hijo_primer_apellido_primer_nup,
    segundo_apellido: h.hijo_segundo_apellido_primer_nup,
    edad: h.hijo_edad_primer_nup,
    vive: h.hijo_vf_primer_nup,
  }));

  await registrarHijosPorMatrimonio(matrimonio1.id, hijos1);
}

// === MATRIMONIO 2 ===
const matrimonio2 = await upsertMatrimonio(2, {
  nombre: data.nombre_dos_nup,
  primer_apellido: data.primer_apellido_dos_nup,
  segundo_apellido: data.segundo_apellido_dos_nup,
  regimen_patrimonial: data.regimen_patrimonial_dos_nup,
  vive: data.vive_dos_nup,
});


if (matrimonio2) {
  const hijosArray = Array.isArray(data.hijosSegundoMatrimonio) ? data.hijosSegundoMatrimonio : [];
  const hijos2 = hijosArray.map((h: any) => ({
    nombre: h.hijo_nombre_dos_nup,
    primer_apellido: h.hijo_primer_apellido_dos_nup,
    segundo_apellido: h.hijo_segundo_apellido_dos_nup,
    edad: h.hijo_edad_dos_nup,
    vive: h.hijo_vf_dos_nup,
  }));
  await registrarHijosPorMatrimonio(matrimonio2.id, hijos2);
}


// === HIJOS FUERA DE MATRIMONIO ===

  const hijosArray = Array.isArray(data.hijosFueraMatrimonio) ? data.hijosFueraMatrimonio : [];
  const hijosFuera = hijosArray.map((h: any) => ({
    nombre: h.fuera_hijo_nombre,
    primer_apellido: h.fuera_hijo_primer_apellido,
    segundo_apellido: h.fuera_hijo_segundo_apellido,
    edad: h.fuera_hijo_edad,
    vive: h.fuera_hijo_vf,
  }));
  await registrarHijosFueraMatrimonio(hijosFuera);


    if (data.primer_testamento == 0) {
        const nuevoPath = buildPath(files, 'primer_testamento_doc', f_curp);

        const datosParciales = {
            fecha_tramite: data.fecha_primer_testamento,
            notaria: data.notaria_primer_testamento,
            instrumento_volumen: data.instrumento_primer_testamento,
        };
        const camposLimpiados = cleanEmptyStrings(datosParciales);
        // Verifica si al menos un campo útil viene
        const tieneDatos = Object.values(camposLimpiados).some(
            (valor) => valor !== null && valor !== undefined
        );

        let testamentoExistente = await TestamentoPasados.findOne({
            where: { solicitudId: solicitud.id },
        });

        if (tieneDatos || nuevoPath) {
            if (nuevoPath) {
                camposLimpiados.path_testamento = nuevoPath;
            } else if (testamentoExistente) {
                camposLimpiados.path_testamento = testamentoExistente.path_testamento;
            }

            const valores = {
            ...camposLimpiados,
            solicitudId: solicitud.id,
            };

            if (testamentoExistente) {
            await testamentoExistente.update(valores);
            } else {
            await TestamentoPasados.create(valores);
            }
        } else if (testamentoExistente) {
            // Si no hay datos y no hay path, eliminamos el registro
            await testamentoExistente.destroy();
        }
        }

    function cleanEmptyStrings2<T extends Record<string, any>>(obj: T): T {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v])
        ) as T;
    }
    try {
        if (solicitud?.id) {
        
            await Heredero.destroy({ where: { solicitudId: solicitud.id } });
        }
        if (Array.isArray(data.herederos)) {
            for (const herederoRaw of data.herederos) {
                const herederoLimpio = cleanEmptyStrings2({
                    nombre_heredero: herederoRaw.nombre_heredero,
                    primer_apellido_heredero: herederoRaw.primer_apellido_heredero,
                    segundo_apellido_heredero: herederoRaw.segundo_apellido_heredero,
                    porcentaje: herederoRaw.porcentaje_heredero,
                    edad: herederoRaw.edad_heredero,
                    parentesco: herederoRaw.parentesco_heredero,
                });

                const tieneDatos = Object.values(herederoLimpio).some(
                    (v) => v !== null && v !== undefined
                );

                if (!tieneDatos) continue;

                await Heredero.create({
                    ...herederoLimpio,
                    solicitudId: solicitud.id,
                    derecho_acrecer: data.derecho_acrecer ?? null,
                });
            }
        }
    } catch (error) {
        console.error('Error al crear los HEREDEROS:', error);
    }

    try {
        if (solicitud?.id) {
            await HerederoSustituto.destroy({ where: { solicitudId: solicitud.id } });
        }

        if (Array.isArray(data.herederoSustituto)) {
                const registrosValidos = [];
            for (const h of data.herederoSustituto) {
                    const herederoLimpio = {
                        solicitudId: solicitud.id,
                        nombre_sustituto: h.nombre_sustituto?.trim() || null,
                        primer_apellido_sustituto: h.primer_apellido_sustituto?.trim() || null,
                        segundo_apellido_sustituto: h.segundo_apellido_sustituto?.trim() || null,
                        nombre_a_sustituir: h.nombre_a_sustituir?.trim() || null,
                        primer_apellido_a_sustituir: h.primer_apellido_a_sustituir?.trim() || null,
                        segundo_apellido_a_sustituir: h.segundo_apellido_a_sustituir?.trim() || null,
                        derecho_acrecer: data.derecho_acrecer_sustituto?.toString().trim() || null
                    };

                    const tieneDatos = Object.values(herederoLimpio).some(
                        (v, i) => i > 0 && v !== null // i > 0 para ignorar solicitudId
                    );

                    if (tieneDatos) {
                        registrosValidos.push(herederoLimpio);
                    }
                }

            
                if (registrosValidos.length > 0) {
                    await HerederoSustituto.bulkCreate(registrosValidos);
            }
        }
    } catch (error) {
        console.error('Error al crear los HEREDEROS SUSTITUTOS:', error);
    }
    
    try {
        const datosCrudos = {
            nombre_albacea: data.nombre_albacea,
            primer_apellido_albacea: data.primer_apellido_albacea,
            segundo_apellido_albacea: data.segundo_apellido_albacea,
            nombre_falta_albacea: data.nombre_falta_albacea,
            primer_apellido_falta_albacea: data.primer_apellido_falta_albacea,
            segundo_apellido_falta_albacea: data.segundo_apellido_falta_albacea,
        };

        const datosLimpios = cleanEmptyStrings(datosCrudos);

        const tieneDatos = Object.values(datosLimpios).some(
            (v) => v !== null && v !== undefined
        );

        if (!tieneDatos) {
            console.warn('No hay datos válidos para guardar ALBACEA.');
        } else {
            const datosAlbacea = {
                ...datosLimpios,
                solicitudId: solicitud.id,
            };

            const albaceaExistente = await Albacea.findOne({
                where: { solicitudId: solicitud.id },
            });

            if (albaceaExistente) {
                await albaceaExistente.update(datosAlbacea);
            } else {
                await Albacea.create(datosAlbacea);
            }
        }
    } catch (error) {
        console.error('Error al guardar el ALBACEA:', error);
    }
    
    try {
        if (data.menor_de_edad == 1) {
            const rawValoresTutor = {
                nombre_tutor: data.nombre_tutor,
                primer_apellido_tutor: data.primer_apellido_tutor,
                segundo_apellido_tutor: data.segundo_apellido_tutor,
                nombre_tutor_sustituto: data.nombre_tutor_sustituto,
                primer_apellido_tutor_sustituto: data.primer_apellido_tutor_sustituto,
                segundo_apellido_tutor_sustituto: data.segundo_apellido_tutor_sustituto,
                nombre_curador: data.nombre_curador,
                primer_apellido_curador: data.primer_apellido_curador,
                segundo_apellido_curador: data.segundo_apellido_curador,
                nombre_a_su_falta_curador: data.nombre_a_su_falta_curador,
                primer_apellido_a_su_falta_curador: data.primer_apellido_a_su_falta_curador,
                segundo_apellido_a_su_falta_curador: data.segundo_apellido_a_su_falta_curador,
            };

            const cleaned = cleanEmptyStrings(rawValoresTutor);
            const tieneDatos = Object.values(cleaned).some((v) => v !== null && v !== undefined);

            if (!tieneDatos) {
                console.warn('No hay datos válidos para guardar TUTOR.');
            } else {
                const valoresTutor = {
                    solicitudId: solicitud.id,
                    ...cleaned
                };

                const tutorExistente = await TutorDescendiente.findOne({
                    where: { solicitudId: solicitud.id }
                });

                if (tutorExistente) {
                    await tutorExistente.update(valoresTutor);
                } else {
                    await TutorDescendiente.create(valoresTutor);
                }
            }
        }else{
            const tutorExistente = await TutorDescendiente.findOne({
                    where: { solicitudId: solicitud.id }
                });
            if(tutorExistente){
                await tutorExistente.destroy();
            }
        }
    } catch (error) {
        console.error('Error al guardar el TUTOR del descendiente menor de edad:', error);
    }
   
     
    const buildIndexedPath = (field: string, index: number): string | undefined => {
        const fullFieldName = `testigos[${index}][${field}]`; 
        const file = files[fullFieldName]?.[0];
        return file ? path.join('storage', data.f_curp, file.filename) : undefined;
    };

 const normalizeValues = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    for (const key in obj) {
        let value = obj[key];

        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '') ||
            value === 'null'
        ) {
            result[key] = null;
        } else {
            result[key] = typeof value === 'string' ? value.trim() : value;
        }
    }

    return result;
};

// Verifica si al menos un campo del objeto tiene un valor no nulo y no vacío
const hasMeaningfulData = (obj: Record<string, any>) =>
    Object.values(obj).some(val =>
        typeof val === 'string' ? val.trim() !== '' : val !== null && val !== undefined
    );

    
   try {
        if (solicitud?.id) {
            // Obtener los testigos anteriores por si hay que reutilizar rutas de archivos
            const testigosAnteriores = await Testigo.findAll({
                where: { solicitudId: solicitud.id },
                order: [['id', 'ASC']]
            });

            // Eliminar todos los registros anteriores
            await Testigo.destroy({
                where: { solicitudId: solicitud.id }
            });

            
            // Solo procesar si viene un array válido
            if (Array.isArray(data.testigos)) {
                const registrosValidos = [];

                for (let i = 0; i < data.testigos.length; i++) {
                    const itemtest = data.testigos[i];
                    const anterior = testigosAnteriores[i];

                    const getPath = (field: string, anteriorPath?: string): string | null => {
                        const nuevoPath = buildIndexedPath(field, i);
                        if (typeof nuevoPath === 'string' && nuevoPath.trim() !== '') {
                            return nuevoPath;
                        }
                        return anteriorPath?.trim() || null;
                    };

                    const datosTestigo = normalizeValues({
                        solicitudId: solicitud.id,
                        nombre_testigo: itemtest.nombre_testigo,
                        primer_apellido_testigo: itemtest.primer_apellido_testigo,
                        segundo_apellido_testigo: itemtest.segundo_apellido_testigo,
                        nacionalidad: itemtest.nacionalidad_testigo,
                        fecha_naciento: itemtest.fecha_nacimiento_testigo,
                        lugar_nacimiento: itemtest.lugar_nacimiento_testigo,
                        curp_dato: itemtest.curp_testigo,
                        estado_civil: itemtest.estado_civil_testigo,
                        ocupacion: itemtest.ocupacion_testigo,
                        domicilio: itemtest.domicilio_testigo,
                        cp: itemtest.cp_testigo,
                        telefono: itemtest.telefono_testigo,
                        rfc: itemtest.rfc_testigo,
                        identificacion: getPath('identificacion_t', anterior?.identificacion ?? undefined),
                        curp: getPath('curp_t', anterior?.curp ?? undefined),
                        comprobante_domicilio: getPath('comprobante_domicilio_t', anterior?.comprobante_domicilio ?? undefined),
                    });

                    if (hasMeaningfulData(datosTestigo)) {
                        registrosValidos.push(datosTestigo);
                    }
                }
                // console.log("holaaaaaaaa testigos", registrosValidos)
                // return 500;
                if (registrosValidos.length > 0) {
                    await Testigo.bulkCreate(registrosValidos);
                }
            }
        }
    } catch (error) {
        console.error('Error al crear los TESTIGOS:', error);
    }
    


    } catch (error) {
        console.error('Error al crear alguna parte de solicitud:', error);
    }

  return res.status(200).json({ message: 'Progreso guardado correctamente' });
};



