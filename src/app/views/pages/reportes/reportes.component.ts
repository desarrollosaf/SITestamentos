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
  selectedPersonId: string = '';
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  people: Person[] = [];
  
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

  public lineChartData: ChartConfiguration['data'] = {
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Junio 2025`),
      datasets: [{
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * (25 - 5 + 1)) + 5),
        label: "Registros fechas",
        borderColor: this.themeCssVariables.danger,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: this.themeCssVariables.light,
        pointHoverBackgroundColor: this.themeCssVariables.light,
        pointBorderColor: this.themeCssVariables.danger,
        pointHoverBorderColor: this.themeCssVariables.danger,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        tension: .3
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
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
      },
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
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
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

  ngOnInit(): void {
    
    // array of objects
    this.people = PeoplesData.peoples;

  }

}
