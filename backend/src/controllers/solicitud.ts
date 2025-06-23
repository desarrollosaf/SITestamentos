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
            //indique_nacionalidad_serv: data.indique_nacionalidad_serv,
            //documento_residencia: data.documento_residencia_serv,
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
                primer_apellido_tutor: data.nombre_tutor,
                segundo_apellido_tutor: data.segundo_apellido_tutor,
                nombre_tutor_sustituto: data.nombre_tutor_sustituto,
                primer_apellido_tutor_sustituto: data.nombre_tutor_sustituto,
                segundo_apellido_tutor_sustituto: data.nombre_tutor_sustituto,
                nombre_curador: data.nombre_curador,
                primer_apellido_curador:  data.nombre_curador,
                segundo_apellido_curador: data.nombre_curador,
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
    return 500
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

    try {
        let solicitudes = await Solicitud.findAll({
            where: { id: id },
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