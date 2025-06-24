import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, signal, inject, computed } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment'; 
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

    private myAppUrl: string;
    private myAPIUrl: string;
    private myAPIUrl2: string;
    private myAPIUrl3: string;
    private http = inject( HttpClient );

    constructor() {
    this.myAppUrl = enviroment.endpoint;
    this.myAPIUrl = 'api/datosp';
    this.myAPIUrl2 = 'api/estados';
    this.myAPIUrl3 = 'api/solicitudes';


    }


    getsolicitudes(): Observable<string> {
        return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl3}/getsolicitudes/`)
    }
    getsolicitud(id:string): Observable<string> {
        return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl3}/getsolicitud/${id}`)
    }
    getLocalidad(id: string): Observable<string> {
      return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl2}/getcodigo/${id}`)
    }


}