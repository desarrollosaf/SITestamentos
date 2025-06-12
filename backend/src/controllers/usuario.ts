import { Request, Response, NextFunction } from 'express'
import UsersSafs from '../models/users';
import SUsuario from '../models/s_usuario';
import Dependencia from '../models/t_dependencia';
import Direccion from '../models/t_direccion';
import Departamento from '../models/t_departamento';



export const getRegistros = async (req: Request, res: Response): Promise<any> => {
    const usuarios = await UsersSafs.findAll({
    include: [
            {
            model: SUsuario,
            as: 'datos_user',
            include: [
                {
                model: Dependencia,
                as: 'dependencia',
                },
                {
                model: Direccion,
                as: 'direccion',
                },
                {
                model: Departamento,
                as: 'departamento',
                },
            ],
            },
        ],
    });
    return res.json({
        msg: `List de exitosamente`,
        
        data: usuarios
    });
}