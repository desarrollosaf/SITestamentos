import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import routesEstados from '../routes/fun/estados';
import routesDatosp from '../routes/fun/datosp';
import routesUser from '../routes/user';
import routesSolicitud from '../routes/solicitudes';  
import routesCitas from '../routes/citas';
import routesReportes from '../routes/reportes';
import UsersSafs from '../models/saf/users';
import { verifyToken } from '../middlewares/auth';
import cookieParser from 'cookie-parser';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.middlewares();  
        this.routes();
        this.DBconnetc();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("La aplicación se está ejecutando exitosamente en el puerto => " + this.port);
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

        // ✅ Middleware para proteger solo rutas privadas
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const publicPaths = [
                '/api/user/login',
                // '/api/user/register',
                '/token',
            ];

            const isPublic = publicPaths.some(path => req.originalUrl.startsWith(path));
            
            if (isPublic) {
                return next(); // no proteger
            }

            return verifyToken(req, res, next); // proteger
        });
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use(routesEstados);
        this.app.use(routesDatosp);
        this.app.use(routesUser);
        this.app.use(routesSolicitud);
        this.app.use(routesCitas);
        this.app.use(routesReportes);
    }

    async DBconnetc() {
        try {
            await UsersSafs.sync(); 
            console.log("Conexión a DB exitosa");
        } catch (error) {
            console.log("Conexión a DB errónea => " + error);
        }
    }
}

export default Server;