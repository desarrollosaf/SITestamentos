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


dp_datospersonales.initModel(sequelizefun);

export const saveinfo = async (req: Request, res: Response): Promise<any> => {
    const data  = req.body;
    // console.log(data);
    // return 200 
    const Upassword = data.f_rfc;
    const UpasswordHash = await bcrypt.hash(Upassword, 10);
    const newUser = await User.create({
      name:  data.f_rfc,
      email:  data.correo_per,
      password: UpasswordHash,
    });

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
             estadocivil_id: data.estadocivil_id
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
             estadocivil_id: data.estadocivil_id
            });
    }
     const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const f_curp = data.f_curp;

    const buildPath = (field: string): string | null => {
        const file = files[field]?.[0];
        return file ? path.join('storage', f_curp, file.filename) : null;
    };

    const solicituddata: any = {
        userId: newUser.id,
        fecha_envio: new Date(),
        documento_residencia: buildPath(`documento_residencia`),
        nacionalidad: data.nacionalidad === '2' ? data.otranacionalidad : 'Mexicana',
    };
    const solicitud = await Solicitud.create(solicituddata);

    const documentosFields = [
        'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
        'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
        'ine'
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

    const padre = await Padre.create({
        solicitudId: solicitud.id,
        tipo: '1',
        nombre_completo: data.nombre_padre,
        vive: data.vivepadre,
        nacionalidad: data.nacionalidadpadre === '2' ? data.otranacionalidadpadre : 'Mexicana',
    });
    const madre = await Padre.create({
        solicitudId: solicitud.id,
        tipo: '2',
        nombre_completo: data.nombre_madre,
        vive: data.vivemadre,
        nacionalidad: data.nacionalidadmadre === '2' ? data.otranacionalidadmadre : 'Mexicana',
    });

    const primerasnupcias = await Matrimonio.create({
        solicitudId: solicitud.id,
        orden: 1,
        conyuge_nombre: data.conyuge_nombre,
        regimen_patrimonial: data.regimen_patrimonial,
        vive: data.vivemadre,
    });

    for (const hijosprimer of data.hijosprimer) {
        const hijosprimerasnupcias = await Hijos.create({
            solicitudId: solicitud.id,
            matrimonioId: primerasnupcias.id,
            nombre_completo: hijosprimer.nombre,
            edad: hijosprimer.edad,
            vive: hijosprimer.vivemadre,
            reconocido: true,
            fuera_de_matrimonio: false,
            nombre_fuera: ''
        });
    }

    const segundasnupcias = await Matrimonio.create({
        solicitudId: solicitud.id,
        orden: 2,
        conyuge_nombre: data.conyuge_nombre,
        regimen_patrimonial: data.regimen_patrimonial2,
        vive: data.vivemadre2,
    });

    for (const hijossegundos of data.hisjossegundo) {
        const hijossegundasnupcias = await Hijos.create({
            solicitudId: solicitud.id,
            matrimonioId: segundasnupcias.id,
            nombre_completo: hijossegundos.nombre,
            edad: hijossegundos.edad,
            vive: hijossegundos.vivemadre,
            reconocido: true,
            fuera_de_matrimonio: false,
            nombre_fuera: ''
        });
    }

    for (const hijosfuera of data.hijosfuera) {
        const hijosfueramatrimonio = await Hijos.create({
            solicitudId: solicitud.id,
            matrimonioId: '',
            nombre_completo: hijosfuera.nombre,
            edad: hijosfuera.edad,
            vive: hijosfuera.vivemadre,
            reconocido: false,
            fuera_de_matrimonio: true,
            nombre_fuera: data.nombre_fuera
        });
    }

    if(data.primer_testamento == false){
        const tienetestamento = await TestamentoPasados.create({
            solicitudId: solicitud.id,
            fecha_tramite: data.fecha_tramite,
            notaria: data.notaria,
            instrumento_volumen: data.instrumento_volumen,
            path_testamento: buildPath(`path_testamento`),
        });
    }

    if(data.herederos){
         for (const heredero of data.herederos) {
            const herederos = await Heredero.create({
                solicitudId: solicitud.id,
                nombre_completo: heredero.nombre_completo_heredero,
                porcentaje: heredero.porcentaje,
                derecho_acrecer: heredero.derecho_acrecer,
                edad: heredero.edad,
                parentesco: heredero.parentesco
            });
         }  
    }

     if(data.herederossustitutos){
         for (const herederosustituto of data.herederossustitutos) {
            const herederosustitut = await HerederoSustituto.create({
                solicitudId: solicitud.id,
                nombre_completo: herederosustituto.nombre_completo_heredero,
                nombre_completo_asustituir: herederosustituto.nombre_completo_asustituir,
                derecho_acrecer: herederosustituto.derecho_acrecer
            });
         }  
    }

    const albacea = await Albacea.create({
                solicitudId: solicitud.id,
                nombre_completo: data.nombre_completo_albacea,
                a_su_fata: data.a_su_falta,
    });

    if(data.heredero_menor_edad == 1){
        const tutor = await TutorDescendiente.create({
                solicitudId: solicitud.id,
                nombre: data.nombre_tutor,
                nombre_tutor_sustituto: data.nombre_tutor_sustituto,
                nombre_curador: data.nombre_curador,
                nombre_curador_falta: data.nombre_curador_falta,
        });
    }
    
    const buildIndexedPath = (field: string, index: number): string | null => {
        const file = files[field]?.[index];
        return file ? path.join('storage', data.f_curp, file.filename) : null;
    };


    if (data.testigos) {
        for (let i = 0; i < data.testigos.length; i++) {
            const itemtest = data.testigos[i];

            const testig = await Testigo.create({
            solicitudId: solicitud.id,
            nombre_completo: itemtest.nombre_completo,
            nacionalidad: itemtest.nacionalidad,
            fecha_naciento: itemtest.fecha_naciento,
            lugar_nacimiento: itemtest.lugar_nacimiento,
            curp_dato: itemtest.curp_dato,
            estado_civil: itemtest.estado_civil,
            ocupacion: itemtest.ocupacion,
            domicilio: itemtest.domicilio,
            cp: itemtest.cp,
            telefono: itemtest.telefono,
            rfc: itemtest.rfc,
            identificacion: buildIndexedPath('identificacion', i),
            curp: buildIndexedPath('curp', i),
            comprobante_domicilio: buildIndexedPath('comprobante_domicilio', i)
            });
        }
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
                {
                    model: User,
                    as: 'user',
                }
            ]
        });

        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            const user = solicitud.user;
            if (user && user.name) {
                console.log('hola si usuario:', user.name )
                const datos = await dp_datospersonales.findOne({
                    where: { f_rfc: user.name }, 
                });
                console.log(datos)
                // Simular el include dentro de usuarios
                if (datos) {
                    user.setDataValue('datos_user', datos);
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
            where: {id: id},
            include: [
                {
                    model: Testigo,
                    as: 'testigos',
                },
                {
                    model: User,
                    as: 'user',
                }
            ]
        });

        // Cargar datos personales manualmente desde otra base de datos
        for (const solicitud of solicitudes) {
            const user = solicitud.user;
            if (user && user.name) {
                const datos = await dp_datospersonales.findOne({
                    where: { f_rfc: user.name }, 
                });
                // Simular el include dentro de usuarios
                if (datos) {
                    user.setDataValue('datos_user', datos);
                }
            }
        }

        if (solicitudes) {
            return res.json(solicitudes);
        } else {
            return res.status(404).json({ msg: `No existe el id ${id}` });
        }
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};