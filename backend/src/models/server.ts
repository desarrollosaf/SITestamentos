import express, {Application} from 'express'
import cors from 'cors'
import path from 'path';
import routesUser from '../routes/user'
import routesEstados from '../routes/estados'

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
         this.app.use(routesUser);
         this.app.use(routesEstados);
    }

    

    midlewares(){
        this.app.use(express.json())
        this.app.use(cors())

    }

    async DBconnetc(){
        try {

            console.log("Conexion de DB exitoso");

        } catch (error) {
            console.log("Conexion de DB errorena => "+error);
            
        }
    }

    
}


export default Server