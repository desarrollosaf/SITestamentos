import { Request, Response } from 'express';
import sequelizefun from '../database/fun'; // La conexión
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales';
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import Cita from '../models/citas';

dp_datospersonales.initModel(sequelizefun);
dp_fum_datos_generales.initModel(sequelizefun);

export const getservidor = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
   
    let registro: dp_datospersonales | dp_fum_datos_generales | null = await dp_datospersonales.findOne({ 
    where: { f_curp: id }
    });

    if (!registro) {
    registro = await dp_fum_datos_generales.findOne({ 
        where: { f_curp: id }
    });

    if (!registro) {
        return res.status(500).json({ error: 'existe un servidor publico en el curp', id });
    }
    }
    return res.json({
      msg: `si existe el servidor`,
      estatus: '200'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const validafecha = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
    const totalCitas = await Cita.count({ 
      where: { fecha: id }
    });

    if (totalCitas >= 20) {
      return res.status(400).json({ 
        error: 'Ya no se pueden agendar más citas para esta fecha. Límite alcanzado (20).' 
      });
    }
    
    return res.json({
      msg: `si tenemos disponibilidad`,
      estatus: '200'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const saveregistro = async (req: Request, res: Response): Promise<any> => {
    const { data } = req.body;
  try {
    //  await Cita.create({
    //       curp: data.curp,
    //       fecha: data.fecha,
    //   }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};