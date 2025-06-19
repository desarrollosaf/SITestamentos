import { Request, Response, NextFunction } from 'express'
import Solicitud from '../models/solicitud';
import User from '../models/user';
import bcrypt from 'bcrypt'
import Testigo  from '../models/testigos';
import sequelizefun from '../database/fun'; // La conexión
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import path from 'path';


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
             
            });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const f_curp = data.f_curp;

    const buildPath = (field: string): string | null => {
    const file = files[field]?.[0];
    return file ? path.join('storage', f_curp, file.filename) : null;
    };

    // Crear solicitud
    const solicitudFields = [
    'acta_nacimiento', 'acta_matrimonio', 'identificacion', 'curp',
    'comprobante_domicilio', 'certificado_privado', 'certificado_publico',
    ];

    const solicitudPayload: any = {
    userId: newUser.id,
    lugar_nacimiento: data.lugar_nacimiento,
    fecha_envio: new Date(),
    };

    for (const field of solicitudFields) {
    solicitudPayload[field] = buildPath(field);
    }

    const solicitud = await Solicitud.create(solicitudPayload);

    // Crear testigos
    if (data.testigos === 'true') {
        const crearTestigo = (i: number) => {
        const prefix = `t${i}_`;
        return Testigo.create({
            solicitudId: solicitud.id,
            identificacion: buildPath(`${prefix}identificacion`),
            curp: buildPath(`${prefix}curp`),
            comprobante_domicilio: buildPath(`${prefix}comprobante_domicilio`),
        });
        };
        const [test1, test2, test3] = await Promise.all([
            crearTestigo(1),
            crearTestigo(2),
            crearTestigo(3),
        ]);
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