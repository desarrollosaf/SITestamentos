import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Solicitud from '../models/solicitud';
import { col, fn, Op } from 'sequelize';
import SUsuario from '../models/saf/s_usuario';
import Dependencia from '../models/saf/t_dependencia';

export const getinfo = async (req: Request, res: Response): Promise<any> => {
    const opciones: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    const fechaFormateada = new Date().toLocaleString('es-MX', opciones);
    const total = await Solicitud.count();
    const dependencias = await Dependencia.findAll();

    return res.json({
        fechaactual: fechaFormateada,
        total: total,
        dependencias: dependencias
    });
}

export const getregistros = async (req: Request, res: Response): Promise<any> => {
    const { fecha_inicial, fecha_final, dependencia } = req.body;
    
    const fechaInicio = new Date(`${fecha_inicial}T00:00:00`);
    const fechaFin = new Date(`${fecha_final}T23:59:59`);

   
    const usuarios = await SUsuario.findAll({
    where: { id_Dependencia: dependencia },
    attributes: ['N_Usuario'] 
    });

  
    const idsUsuarios = usuarios
    .map(u => u.N_Usuario)
    .filter((id): id is string => id !== null); 

 
    const solicitudes = await Solicitud.findAll({
    attributes: [
        [fn('DATE', col('createdAt')), 'fecha'],   // Agrupa solo por día (sin hora)
        [fn('COUNT', col('id')), 'total']
    ],
    where: {
        userId: {
        [Op.in]: idsUsuarios
        },
        createdAt: {
        [Op.between]: [fechaInicio, fechaFin]
        }
    },
    group: [fn('DATE', col('createdAt'))],       // Agrupación por día
    order: [[fn('DATE', col('createdAt')), 'ASC']]
    });

    const totalGeneral = solicitudes.reduce((acc, item: any) => acc + parseInt(item.getDataValue('total')), 0);

   
  

    return res.json({
        total: totalGeneral,
        porfecha: solicitudes, 
    });
}