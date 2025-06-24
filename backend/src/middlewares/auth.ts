// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || 'TSE-Poder-legislativo';

export interface JwtPayload {
    id: number;
    role: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ msg: 'Token no proporcionado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inválido' });
        return;
    }
};
