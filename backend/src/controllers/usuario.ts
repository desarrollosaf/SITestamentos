import { Request, Response, NextFunction } from 'express'
import UsersSafs from '../models/saf/users';
import SUsuario from '../models/saf/s_usuario';
import Dependencia from '../models/saf/t_dependencia';
import Direccion from '../models/saf/t_direccion';
import Departamento from '../models/saf/t_departamento';



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