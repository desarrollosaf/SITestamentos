import { Request, Response, NextFunction } from 'express'
import UsersSafs from '../models/users';
import SUsuario from '../models/s_usuario';



export const getRegistros = async (req: Request, res: Response): Promise<any> => {
    const usuarios = await UsersSafs.findAll({
        include: [
            {
            model: SUsuario,
            as: 'datos_user',
            },
        ],
    });
    return res.json({
        msg: `List de exitosamente`,
        
        data: usuarios
    });
}