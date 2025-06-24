import express, {Application} from 'express'
import cors from 'cors'
import path from 'path';
import routesEstados from '../routes/fun/estados'
import routesDatosp from '../routes/fun/datosp'
import routesUser from '../routes/user'
import routesSolicitud from '../routes/solicitudes'  
import routesCitas from '../routes/citas'
import UsersSafs from '../models/saf/users'
import { verifyToken } from '../middlewares/auth';
import routesReportes from '../routes/reportes' 


class Server {

    private app: Application
    private port: string
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.midlewares();  
        this.router();
        this.DBconnetc();
        this.listen();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("La aplicación se esta corriendo exitosamente en el puerto => "+ this.port)           
        })
        
    }

    router(){
        this.app.use(routesEstados);
        this.app.use(routesDatosp);
        this.app.use(routesUser);
        this.app.use(routesSolicitud);
        this.app.use(routesCitas);
        this.app.use(routesReportes);
    }

    

    midlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use('/storage', express.static(path.join(process.cwd(), 'storage')));
        // this.app.use(verifyToken);

    }

    async DBconnetc(){
        try {

            await UsersSafs.sync(); 
            console.log("Conexion de DB exitoso");

        } catch (error) {
            console.log("Conexion de DB errorena => "+error);
            
        }
    }

    
}


export default Server