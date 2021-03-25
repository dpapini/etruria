import { CounterupModule } from './../../core/component/counterup/counterup.module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
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
import { SuppliersReducer, SuppliersState } from './store/supplier.reducer';
import { SuppliersEffects } from './store/supplier.effects';
import { IdxLinePriceComponent } from './idxLinePrice/idx-line-price.component';
import { GrossPriceComponent } from './grossPrice/gross-price.component';

export interface SupplierState {
  EtruriaSuppliers: SuppliersState
}

const reducers: ActionReducerMap<SupplierState> = {
  EtruriaSuppliers: SuppliersReducer
}

@NgModule({
  declarations: [SupplierComponent, SupplierBenchmarkComponent, IdxLinePriceComponent, GrossPriceComponent],
  imports: [
    CommonModule,
    CounterupModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgbModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridBenchmarkBtnCellRenderer]),
    StoreModule.forFeature('EtruriaSuppliers', reducers),
    EffectsModule.forFeature([SuppliersEffects])
  ]
})
export class SupplierModule { }
