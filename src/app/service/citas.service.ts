import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, signal, inject, computed } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment'; 
@Injectable({
  providedIn: 'root'
})
export class CitasService {

    private myAppUrl: string;
    private myAPIUrl: string;
    private myAPIUrl2: string;
    private myAPIUrl3: string;
    private myAPIUrl4: string;
    private http = inject( HttpClient );

    constructor() {
        this.myAppUrl = enviroment.endpoint;
        this.myAPIUrl ='api/citas';
        this.myAPIUrl2 = 'api/datosp';
        this.myAPIUrl3 = 'api/estados';
        this.myAPIUrl4 = 'api/solicitudes';
    }





    

    getDisponibilidad(id:string): Observable<string> {
        return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl}/validafecha/${id}`)
    }
    // getsolicitud(id:string): Observable<string> {
    //     return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl3}/getsolicitud/${id}`)
    // }
    // getLocalidad(id: string): Observable<string> {
    //   return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl2}/getcodigo/${id}`)
    // }


}