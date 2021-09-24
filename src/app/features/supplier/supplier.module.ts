import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridBenchmarkBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-benchmark-btn-cell-render copy';
import { AgGridComponentModule } from 'src/app/core/component/aggrid/ag-grid-component.module';
import { CounterupModule } from './../../core/component/counterup/counterup.module';
import { UikitModule } from './../../shared/uikit/uikit.module';
import { AgreementComponent } from './agreement/agreement.component';
import { SupplierBenchmarkComponent } from './benchmark/supplier-benchmark.component';
import { GrossPriceComponent } from './grossPrice/gross-price.component';
import { SupplierHeaderComponent } from './header/supplier-header.component';
import { IdxLinePriceComponent } from './idxLinePrice/idx-line-price.component';
import { CrossLineModalComponent } from './modal/cross-line-modal/cross-line-modal.component';
import { LinePriceModalComponent } from './modal/line-price-modal/line-price-modal.component';
import { PurchasedLineValuePipe } from './modal/purchased-modal/purchased-line-value.pipe';
import { PurchasedLineYearPipe } from './modal/purchased-modal/purchased-line-year.pipe';
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
    LinePriceModalComponent, AgreementComponent
    , PurchasedModalComponent, PurchasedLineYearPipe, PurchasedLineValuePipe
    , SupplierHeaderComponent, CrossLineModalComponent],
  imports: [
    CommonModule,
    CounterupModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgbModule,
    NgSelectModule,
    UikitModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridBenchmarkBtnCellRenderer]),
    StoreModule.forFeature('EtruriaSuppliers', reducers),
    EffectsModule.forFeature([SuppliersEffects])
  ],
  entryComponents: [LinePriceModalComponent, PurchasedModalComponent, CrossLineModalComponent]
})
export class SupplierModule { }
