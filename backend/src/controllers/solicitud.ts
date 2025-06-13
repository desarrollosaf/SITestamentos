import { Request, Response, NextFunction } from 'express'
import { Solicitud } from '../models/solicitud';
import User from '../models/user';
import bcrypt from 'bcrypt'
import { Testigo } from '../models/testigos';
import sequelizefun from '../database/fun'; // La conexión
import { dp_datospersonales } from '../models/fun/dp_datospersonales';

dp_datospersonales.initModel(sequelizefun);

export const saveinfo = async (req: Request, res: Response): Promise<any> => {
    const { data } = req.body;

console.log(data);
    const Upassword = data.curp;
    const UpasswordHash = await bcrypt.hash(Upassword, 10);
    const newUser = await User.create({
      name: data.curp,
      email: data.correo_per,
      password: UpasswordHash,
    });

    let registro = await dp_datospersonales.findOne({ 
        where: { f_curp: data.curp }
    });

    if (!registro) {
         const test = await dp_datospersonales.create({
             f_curp: data.curp,
             f_rfc: data.rfc,
             f_nombre: data.nombre,
             f_primer_apellido: data.f_primer_apellido,
             f_segundo_apellido: data.f_segundo_apellido,
             f_fecha_nacimiento: data.f_fecha_nacimiento,
             estado_id: data.estado_id,
             municipio_id: data.municipio_id,
             colonia_id: data.colonia_id,
             f_domicilio: data.f_domicilio,
             numext: data.numext,
             correo_per: data.correo_per,
             f_homclave: ''
         });    
    };



    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };

    const solicitud = await Solicitud.create({
            userId: newUser.id,
            lugar_nacimiento: data.lugar_nacimiento,
            acta_nacimiento: files['acta_nacimiento']?.[0]?.path,
            acta_matrimonio: files['acta_matrimonio']?.[0]?.path,
            identificacion:  files['identificacion']?.[0]?.path,
            curp: files['curp']?.[0]?.path,
            comprobante_domicilio: files['comprobante_domicilio']?.[0]?.path,
            certificado_privado: files['certificado_privado']?.[0]?.path,
            certificado_publico: files['certificado_publico']?.[0]?.path, 
            fecha_envio: new Date(),
    })

    for (const testigo of data.testigos) {
    const test = await Testigo.create({
        solicitudId: solicitud.id,
        nombre: testigo.nombre,
        rfc: files['rfc']?.[0]?.path,
        identificacion: files['identificacion']?.[0]?.path,
        curp: files['curp']?.[0]?.path,
        comprobante_domicilio: files['comprobante_domicilio']?.[0]?.path,
        });
    }

    return res.status(201).json({
        message: 'Documento guardado exitosamente'
    });
};