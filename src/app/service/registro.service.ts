import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, signal, inject, computed } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private myAppUrl: string;
  private myAPIUrl: string;
  private myAPIUrl2: string;
  private http = inject( HttpClient );

  constructor() {
    this.myAppUrl = 'http://localhost:3001/';
    this.myAPIUrl = 'api/datosp';
    this.myAPIUrl2 = 'api/estados';

  }

  getLocalidad(id: string): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl2}/getcodigo/${id}`)
  }

  getDatosUser(id: String): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl}/getregistro/${id}`)
  }

}