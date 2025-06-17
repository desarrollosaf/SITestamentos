import { Request, Response } from 'express';
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import sequelizefun from '../database/fun'; // La conexión
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales';
import Solicitud from '../models/solicitud';
import User from '../models/user';

dp_datospersonales.initModel(sequelizefun);
dp_fum_datos_generales.initModel(sequelizefun);

export const getregistro = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    console.log(id);
  try {
   
    let registro: dp_datospersonales | dp_fum_datos_generales | null = await dp_datospersonales.findOne({ 
      where: { f_curp: id }
    });

    if (!registro) {
      registro = await dp_fum_datos_generales.findOne({ 
          where: { f_curp: id }
      });
      if (!registro) {
          return res.status(500).json({ error: 'No se tiene ningun registro' });
      }
    }
    const solicitud = await User.findOne({
      where: { name: registro.f_rfc }
    })
    if (solicitud) {
          return res.status(400).json({ error: 'Este servidor ya cuenta con un registro' });
    }
    return res.json({
      msg: `Lista obtenida exitosamente`,
      data: registro
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};