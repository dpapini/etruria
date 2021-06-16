import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridBenchmarkBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-benchmark-btn-cell-render copy';
import { AgGridComponentModule } from 'src/app/core/component/aggrid/ag-grid-component.module';
import { CounterupModule } from './../../core/component/counterup/counterup.module';
import { UikitModule } from './../../shared/uikit/uikit.module';
import { AgreementComponent, MyFilterPipe } from './agreement/agreement.component';
import { SupplierBenchmarkComponent } from './benchmark/supplier-benchmark.component';
import { GrossPriceComponent } from './grossPrice/gross-price.component';
import { IdxLinePriceComponent } from './idxLinePrice/idx-line-price.component';
import { LinePriceModalComponent } from './modal/line-price-modal/line-price-modal.component';
import { PurchasedModalComponent } from './modal/purchased-modal/purchased-modal.component';
import { SuppliersEffects } from './store/supplier.effects';
import { SuppliersReducer, SuppliersState } from './store/supplier.reducer';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';



export interface SupplierState {
  EtruriaSuppliers: SuppliersState
}

const reducers: ActionReducerMap<SupplierState> = {
  EtruriaSuppliers: SuppliersReducer
}

@NgModule({
  declarations: [SupplierComponent, SupplierBenchmarkComponent, IdxLinePriceComponent, GrossPriceComponent,
    LinePriceModalComponent, AgreementComponent, MyFilterPipe, PurchasedModalComponent],
  imports: [
    CommonModule,
    CounterupModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgbModule,
    UikitModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridBenchmarkBtnCellRenderer]),
    StoreModule.forFeature('EtruriaSuppliers', reducers),
    EffectsModule.forFeature([SuppliersEffects])
  ],
  entryComponents: [LinePriceModalComponent, PurchasedModalComponent]
})
export class SupplierModule { }
