import { Injectable, signal, inject, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment'; 

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private myAppUrl: string;
  private myAPIUrl: string;
  private http = inject( HttpClient );

  constructor() {
    this.myAppUrl = enviroment.endpoint;
    this.myAPIUrl = 'api/reporte';
  }

  getInfo(): Observable<string> {
    return this.http.get<string>(`${this.myAppUrl}${this.myAPIUrl}/getinfo`)
  }
}
