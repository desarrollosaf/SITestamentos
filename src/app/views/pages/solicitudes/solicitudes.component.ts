import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@siemens/ngx-datatable';
import { SolicitudesService } from '../../../service/solicitudes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import { AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

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
  isLoading: boolean = false;
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

  setPage(pageInfo: any) {
    this.page = pageInfo.offset;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.rows = this.temp.slice(start, end);
  }

  updateFilter(event: any) {
    const val = (event.target?.value || '').toLowerCase();
    this.temp = this.originalData.filter((row: any) => {
      const nombreCompleto = (
      row.datos_user?.f_nombre + ' ' +
      row.datos_user?.f_primer_apellido + ' ' +
      row.datos_user?.f_segundo_apellido
    ).toLowerCase() || '';
      const curp = row.datos_user?.f_curp?.toLowerCase() || '';
      return (
        nombreCompleto.includes(val) ||
         curp.includes(val)

      );
    });
    this.filteredCount = this.temp.length;
    this.setPage({ offset: 0 });
  }


  notificarsp(){
    this.isLoading = true;

      this._solicitudService.sendNotificacion().subscribe({
      next: (response: any) => {

this.isLoading = false;
  Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Atención!",
            text: `Los recordatorios se han enviado correctamente.`,
            showConfirmButton: false,
            timer: 2000
          });
        
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      }
    });

  }

}