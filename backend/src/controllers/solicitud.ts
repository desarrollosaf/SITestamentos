import { Request, Response, NextFunction } from 'express'
import { Solicitud } from '../models/solicitud';
import User from '../models/user';
import bcrypt from 'bcrypt'
import { Testigo } from '../models/testigos';


export const saveinfo = async (req: Request, res: Response): Promise<any> => {
    const { data } = req.body;


    const Upassword = data.curp;
    const UpasswordHash = await bcrypt.hash(Upassword, 10);
    const newUser = await User.create({
      name: data.curp,
      email: data.curp,
      password: UpasswordHash,
    });

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