import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@siemens/ngx-datatable';
import { SolicitudesService } from '../../../service/solicitudes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import { AfterViewInit } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-solicitudes',
  imports: [
     NgxDatatableModule, CommonModule,RouterModule,NgIconsModule
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})

export class SolicitudesComponent implements AfterViewInit {
  ngAfterViewInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  originalData: any[] = []; 
  temp: any[] = [];   
  rows: any[] = [];
  page: number = 0;
  pageSize: number = 10;
  filteredCount: number = 0;
  loading: boolean = true;
  rutaActual: string = '';
  titulo: string = '';
  tipoEstatus: number = 0;
  public _solicitudService = inject(SolicitudesService);
  @ViewChild('table') table: DatatableComponent;

  constructor() {}

ngOnInit(): void {
  this._solicitudService.getsolicitudes().subscribe({
      next: (response: any) => {

        this.originalData = [...response];
        this.temp = [...this.originalData];
        this.rows = this.temp;   
        this.filteredCount = this.temp.length;
        this.loading = false;
        
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });

}
  /*setPage(pageInfo: any) {
    this.page = pageInfo.offset;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.temp.slice(start, end); 
  }*/

  updateFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;


    if (inputElement && inputElement.value !== undefined) {
      const val = inputElement.value.toLocaleLowerCase().trim();  
      
      const temp = this.temp.filter((d: any) => {
        
        return Object.values(d).some(value => {
          
          if (value != null) {
            return value.toString().toLocaleLowerCase().includes(val);
          }
          return false;
        }) || !val;  
      });

      this.rows = temp;

      
      this.table.offset = 0;
    }
  }

}