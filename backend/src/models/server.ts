import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

// Rutas
import routesEstados from '../routes/fun/estados';
import routesDatosp from '../routes/fun/datosp';
import routesUser from '../routes/user';
import routesSolicitud from '../routes/solicitudes';
import routesCitas from '../routes/citas';
import routesReportes from '../routes/reportes';
import tokenRoute from '../routes/token';

// Modelos y middlewares
import UsersSafs from '../models/saf/users';
import { verifyToken } from '../middlewares/auth';

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
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
           origin: function (origin, callback) {
                const allowedOrigins = ['https://voluntariado.congresoedomex.gob.mx', 'https://testamentos.siasaf.gob.mx'];
                if (!origin || allowedOrigins.includes(origin) ) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS')); 
                }
            },
            credentials: true
        }));

        this.app.use(cookieParser());
        this.app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const publicPaths = [
                '/api/user/login',
                '/api/token', 
                '/api/solicitudes/getsolicitudesapi/'
            ];

            const isPublic = publicPaths.some(path => req.originalUrl.startsWith(path));
            
            if (isPublic) {
                return next(); // no proteger con cookie
            }

            return verifyToken(req, res, next); // proteger con cookie
        });
    }

    routes() {
        this.app.use(routesEstados);
        this.app.use(routesDatosp);
        this.app.use(routesUser);
        this.app.use(routesSolicitud);
        this.app.use(routesCitas);
        this.app.use(routesReportes);
        this.app.use(tokenRoute); // Token OAuth route
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
