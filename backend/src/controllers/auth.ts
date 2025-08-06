import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = async (req: Request, res: Response): Promise<any> => {
    return res.json({
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params
    });
    const { client_id, client_secret } = req.body;

    if (client_id === 'cliente_externo' && client_secret === 'super_secreto') {
        const token = jwt.sign({ client_id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({
            access_token: token,
            token_type: 'Bearer',
            expires_in: 3600
        });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
};
