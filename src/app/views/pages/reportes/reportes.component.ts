import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ThemeCssVariableService } from '../../../core/services/theme-css-variable.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent as MyNgSelectComponent } from '@ng-select/ng-select';
import { PeoplesData, Person } from '../../../core/dummy-datas/peoples.data';
import Swal from 'sweetalert2';
import { ReportesService } from '../../../core/services/reportes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  imports: [
      BaseChartDirective,
      NgbDatepickerModule, FormsModule, JsonPipe,
      RouterLink,
      NgLabelTemplateDirective,
      NgOptionTemplateDirective,
      MyNgSelectComponent,
      FormsModule,
  ],
  providers: [
      provideCharts(withDefaultRegisterables())
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  public reporteService = inject(ReportesService);
  selectedPersonId: string = '';
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  people: Person[] = [];
  graficaGenerada = false;
  dependencias: any = {};
  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions!: ChartConfiguration<'line'>['options'];
  lineChartType: 'line' = 'line';
  lineChartPlugins: any[] = [];

  private themeCssVariableService = inject(ThemeCssVariableService);
  themeCssVariables = this.themeCssVariableService.getThemeCssVariables();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: this.themeCssVariables.gridBorder,
        },
        ticks: {
          color: this.themeCssVariables.secondary,
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          display: true,
          color: this.themeCssVariables.gridBorder,
        },
        ticks: {
          color: this.themeCssVariables.secondary,
          font: {
            size: 12
          }
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  public barChartData: ChartData<'bar'> = {
    labels: [ "China", "America", "India", "Germany", "Oman"],
    datasets: [
      { 
        label: "Population",
        backgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.warning, this.themeCssVariables.success, this.themeCssVariables.info],
        hoverBackgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.warning, this.themeCssVariables.success, this.themeCssVariables.info],
        borderColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.warning, this.themeCssVariables.success, this.themeCssVariables.info],
        hoverBorderColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.warning, this.themeCssVariables.success, this.themeCssVariables.info],
        data: [2478,5267,734,2084,1433],
      }
    ],
  };

  

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      
      if (this.selectedPersonId) {
        this.graficaGenerada = true;
        const datos = {
          fecha_inicial: this.formatter.format(this.fromDate),
          fecha_final: this.formatter.format(this.toDate),
          dependencia: this.selectedPersonId,
        };
        this.reporteService.getRegistros(datos).subscribe({
          next: (response: any) => {
            console.log(response)
           this.generarGrafica(response.porfecha);
          },
          error: (e: HttpErrorResponse) => {
            const msg = e.error?.msg || 'Error desconocido';
            console.error('Error del servidor:', msg);
          },
        })
        
      } else {
        this.graficaGenerada = false;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "¡Atención!",
          text: `Por favor, seleccione una dependencia.`,
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.graficaGenerada = false; 
    }

    console.log('Desde:', this.fromDate, 'Hasta:', this.toDate, 'Persona:', this.selectedPersonId);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  generarGrafica(response: any[]){
    this.lineChartData = {
      labels: response.map(item => item.fecha), 
      datasets: [{
        data: response.map(item => item.valor),
        label: 'Registros fechas',
        borderColor: '#ff0000',
        backgroundColor: 'transparent',
        fill: true,
        tension: 0.3
      }]
    };

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: this.themeCssVariables.secondary,
            font: {
              size: 13,
              family: this.themeCssVariables.fontFamily
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: true,
            color: this.themeCssVariables.gridBorder
          },
          ticks: {
            color: this.themeCssVariables.secondary,
            font: {
              size: 12
            }
          }
        },
        y: {
          grid: {
            display: true,
            color: this.themeCssVariables.gridBorder
          },
          ticks: {
            color: this.themeCssVariables.secondary,
            font: {
              size: 12
            }
          }
        }
      }
    };

    this.lineChartType = 'line';
    this.lineChartPlugins = [];
  }
  

  ngOnInit(): void {
    this.people = PeoplesData.peoples;
    this.reporteService.getInfo().subscribe({
      next: (response: any) => {
        console.log(response)
        this.dependencias = response
      },
      error: (e: HttpErrorResponse) => {
        const msg = e.error?.msg || 'Error desconocido';
        console.error('Error del servidor:', msg);
      },
    })

  }


}
