import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import  User  from '../models/saf/users'
import  Usertest  from '../models/user'
import  RolUsers  from '../models/role_users'
import  Roles  from '../models/role'
import { Op } from 'sequelize'  
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import  sequelizeSAF  from '../database/connection'


export const ReadUser = async (req: Request, res: Response): Promise<any> => {
    const listUser = await User.findAll();
    return res.json({
        msg: `List de categoría encontrada exitosamenteeeee`,
        data: listUser
    });
}

export const CreateUser = async (req: Request, res: Response,  next: NextFunction) => {

    /*const { Uname, Ulastname, Upassword, Uemail, Ucredential } = req.body  
    console.log(req.body);
    const userEmail = await User.findOne({ where: {  Uemail: Uemail  }})
    const userCredential = await User.findOne({ where: {  Ucredential: Ucredential  }})

    if (userEmail) {
        return next(JSON.stringify({ msg: `Usuario ya existe con el email ${Uemail}`}));
        /*return res.status(400).json({
            msg: `Usuario ya existe con el email ${Uemail}`
        })
    }

    if (userCredential) {
        return next(JSON.stringify({ msg: `Usuario ya existe con la credencial ${Ucredential}`})); 
        /*
        return res.status(400).json({
            msg: `Usuario ya existe con la credencial ${Ucredential}`
        })
    }

    const UpasswordHash = await bcrypt.hash(Upassword, 10)
    try {
        User.create({
            name: Uname,
            lastname: Ulastname,
            Uemail: Uemail,
            Upassword: UpasswordHash,
            Ucredential: Ucredential,
            Ustatus: 1
        })

        return next(JSON.stringify({ msg: `User ${Uname} ${Ulastname} create success.`}));
        /*res.json({
            msg: `User ${Uname} ${Ulastname} create success.`
        })

    } catch (error) {
        return next(JSON.stringify({ msg: `Existe un error al crear el usuario => `, error}));
        /*res.status(400).json({
            msg: `Existe un error al crear el usuario => `, error
        })
    }*/
}

export const LoginUser = async (req: Request, res: Response, next: NextFunction):  Promise<any> => {
    const { rfc, password } = req.body;
    let passwordValid = false;
    let user: any = null;
    let bandera = true;

    if (rfc.startsWith('NOT25')) {

        bandera = false;
        user = await Usertest.findOne({ 
            where: { name: rfc },
        })
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el rfc ${rfc}`
            })
        }
        passwordValid = await bcrypt.compare(password, user.password);
       

    }else{

        user = await User.findOne({ 
            where: { rfc: rfc },
        })
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el rfc ${rfc}`
            })
        }

        const hash = user.password.replace(/^\$2y\$/, '$2b$');
        passwordValid = await bcrypt.compare(password, hash);

    }



    if (!passwordValid) {
        return res.status(402).json({
            msg: `Password Incorrecto => ${password}`
        })
    }

     const accessToken = jwt.sign(
    { rfc: rfc },
    process.env.SECRET_KEY || 'TSE-Poder-legislativo',
    { expiresIn: '15m' }
    );

    res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ más correcto para distinguir local vs producción
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutos
    });
        
    return res.json({ user,bandera })
}

    export const getCurrentUser = (req: Request, res: Response) => {
        const user = (req as any).user;
        // Podrías consultar más info en la base de datos si quieres
        res.json({
        rfc: user.rfc,
        // otros datos si es necesario
        });
    };








