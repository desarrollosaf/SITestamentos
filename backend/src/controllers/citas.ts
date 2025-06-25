import { Request, Response } from 'express';
import sequelizefun from '../database/fun'; // La conexión
import { dp_fum_datos_generales } from '../models/fun/dp_fum_datos_generales';
import { dp_datospersonales } from '../models/fun/dp_datospersonales';
import Cita from '../models/citas';
 import { Op } from 'sequelize';
import { Sequelize, Model, DataTypes } from 'sequelize';
import UsersSafs from '../models/saf/users';
import SUsuario from '../models/saf/s_usuario';
import Dependencia from '../models/saf/t_dependencia';
import Direccion from '../models/saf/t_direccion';
import Departamento from '../models/saf/t_departamento';

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

const MAX_CITAS = 20;

export const validafecha = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const totalCitas = await Cita.count({ 
      where: { fecha: id }
    });

    const disponibles = MAX_CITAS - totalCitas;

    if (totalCitas >= MAX_CITAS) {
      return res.status(400).json({ 
        error: 'Ya no se pueden agendar más citas para esta fecha. Límite alcanzado (20).' 
      });
    }
    
    return res.json({
      msg: `Sí tenemos disponibilidad`,
      disponibles,
      estatus: '200'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const saveregistro = async (req: Request, res: Response): Promise<any> => {
    const  data  = req.body;
  try {
     const cita = await Cita.create({
       rfc: data.rfc,
       fecha: data.fecha,
       hora: data.hora,
       estatus: 0,
     }); 
     return res.json({
      msg: `cita guardada`,
      estatus: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No  se guardo' });
  }
};

export const getCita = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  try {
   
    const citasser = await Cita.findAll({
      where: { rfc: id }
    })

   const usuario = await dp_datospersonales.findAll({
      where: { f_rfc: id },
        attributes: [
          'correo_ins',
          'correo_per',
          'numero_tel',
          'numero_cel',
          [Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
        ],
      raw: true
    });

    return res.json({
      msg: `si existe el servidor`,
      citas: citasser,
      dtaosuser: usuario
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};

export const getcitas = async (req: Request, res: Response): Promise<any> => {
  try {
   
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);


    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const citas = await Cita.findAll({
      where: {
        fecha: {
          [Op.in]: [formatDate(today), formatDate(tomorrow)]
        }
      }
    });

     for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);

                const datos = await dp_datospersonales.findOne({
                 where: { f_rfc: cita.rfc },
                    attributes: [
                      'correo_ins',
                      'correo_per',
                      'numero_tel',
                      'numero_cel',
                      [Sequelize.literal(`CONCAT(f_nombre, ' ', f_primer_apellido, ' ', f_segundo_apellido)`), 'nombre_completo']
                    ],
                  raw: true
                });

                if (datos) {
                cita.setDataValue('datos_user', datos);
                }
            }
      }

      for (const cita of citas) {
            if (cita.rfc) {
                console.log('Buscando datos personales para:', cita.rfc);

                const datos = await SUsuario.findOne({
                 where: { N_Usuario: cita.rfc },
                    attributes: [
                      'N_Usuario', 
                    ], 
                    include: [
                        {
                        model: Dependencia,
                        as: 'dependencia',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                        {
                        model: Direccion,
                        as: 'direccion',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                        {
                        model: Departamento,
                        as: 'departamento',
                        attributes: [
                          'nombre_completo', 
                        ], 
                        },
                    ],
                });

                if (datos) {
                cita.setDataValue('dependencia', datos);
                }
            }
      }



    return res.json({
      msg: `si existe el servidor`,
      citas: citas,
    
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener los registros' });
  }
};