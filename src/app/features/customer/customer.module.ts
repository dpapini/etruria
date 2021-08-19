import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerGridComponent } from './grid/customer-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { CustomerDetailComponent } from './detail/customer-detail.component';
import { CustomerFilterComponent } from './filter/customer-filter.component';


@NgModule({
  declarations: [CustomerComponent, CustomerGridComponent, CustomerDetailComponent, CustomerFilterComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
    UikitModule,
  ]
})
export class CustomerModule { }
