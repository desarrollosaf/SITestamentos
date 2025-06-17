import { Injectable, signal, inject, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private myAppUrl: string;
  private myAPIUrl: string;
  private http = inject( HttpClient );

  constructor() {
    this.myAppUrl = 'https://dev7.siasaf.gob.mx/'; //'https://dev4.siasaf.gob.mx/'   //'http://localhost:3001/'
    this.myAPIUrl = 'api/solicitud';


  }

  getSolicitudes(user : String): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl}/getsolicitud/${user}`)
  }

}
