import { NgSelectModule } from '@ng-select/ng-select';
import { IndicatorComponent } from './component/indicator/indicator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './component/input-text/input-text.component';
import { InputNumberComponent } from './component/input-number/input-number.component';
import { NavtabComponent } from './component/navtab/navtab.component';
import { FormsModule } from '@angular/forms';
import { InputPasswordComponent } from './component/input-password/input-password.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';
import { RoundedDoughnutChartComponent } from './component/rounded-doughnut-chart/rounded-doughnut-chart.component';
import { SearchSupplierComponent } from './component/search-supplier/search-supplier.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputNumberComponent,
    NavtabComponent,
    IndicatorComponent,
    LineChartComponent,
    RoundedDoughnutChartComponent,
    SearchSupplierComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    NavtabComponent,
    IndicatorComponent,
    LineChartComponent,
    RoundedDoughnutChartComponent,
    SearchSupplierComponent,
  ]
})
export class UikitModule { }
