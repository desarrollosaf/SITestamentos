import { Request, Response } from 'express';
import sequelizefun from '../database/fun'; // La conexión
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales';
import { dp_datospersonales } from '../models/fun/dp_datospersonales';

dp_datospersonales.initModel(sequelizefun);
dp_fum_datos_generales.initModel(sequelizefun);

export const getservidor = async (req: Request, res: Response): Promise<any> => {
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