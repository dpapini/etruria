import { ControlpanelModule } from './../../shared/controlpanel/controlpanel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactDetailComponent } from './detail/contact-detail.component';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridComponentModule } from 'src/app/core/component/aggrid/ag-grid-component.module';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { ContactGridComponent } from './grid/contact-grid/contact-grid.component';


@NgModule({
  declarations: [ContactDetailComponent, ContactComponent, ContactGridComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgSelectModule,
    UikitModule,
    ControlpanelModule,
    NgbModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
  ],
  exports: [ContactDetailComponent, ContactGridComponent]

})
export class ContactModule { }
