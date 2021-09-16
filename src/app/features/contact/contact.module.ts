import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridComponentModule } from 'src/app/core/component/aggrid/ag-grid-component.module';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { ControlpanelModule } from './../../shared/controlpanel/controlpanel.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './detail/contact-detail.component';
import { ContactFilterComponent } from './filter/contact-filter.component';
import { ContactGridComponent } from './grid/contact-grid.component';
import { FilterContactReducer, FilterContactState } from './store/filter.reducer';

export interface filterContactState {
  search: FilterContactState;
}

const reducers: ActionReducerMap<filterContactState> = {
  search: FilterContactReducer,
};

@NgModule({
  declarations: [ContactDetailComponent, ContactComponent, ContactGridComponent, ContactFilterComponent],
  imports: [
    CommonModule,
    UikitModule,
    ControlpanelModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    NgbModule,
    AgGridComponentModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
    StoreModule.forFeature('filterContact', reducers),
  ],
  exports: [ContactDetailComponent, ContactGridComponent]

})
export class ContactModule { }
