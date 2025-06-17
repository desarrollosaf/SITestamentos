import express, {Application} from 'express'
import cors from 'cors'
import path from 'path';
import routesUsers from '../routes/saf/user'
import routesEstados from '../routes/fun/estados'
import routesDatosp from '../routes/fun/datosp'
import routesUser from '../routes/user'
import routesSolicitud from '../routes/solicitudes'
import user from '../models/user'

class Server {

    private app: Application
    private port: string
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
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

        this.app.use(routesUsers);
        this.app.use(routesEstados);
        this.app.use(routesDatosp);
        this.app.use(routesUser);
        this.app.use(routesSolicitud);
    }

    

    midlewares(){
        this.app.use(express.json())
        this.app.use(cors())
         this.app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

    }

    async DBconnetc(){
        try {

            await user.sync(); 
            console.log("Conexion de DB exitoso");

        } catch (error) {
            console.log("Conexion de DB errorena => "+error);
            
        }
    }

    
}


export default Server