import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridBenchmarkBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-benchmark-btn-cell-render copy';
import { AgGridComponentModule } from 'src/app/core/component/aggrid/ag-grid-component.module';
import { SupplierBenchmarkComponent } from './benchmark/supplier-benchmark.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';



@NgModule({
  declarations: [SupplierComponent, SupplierBenchmarkComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgbModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridBenchmarkBtnCellRenderer]),
  ]
})
export class SupplierModule { }
