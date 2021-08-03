import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { AgGridComponentModule } from './../../core/component/aggrid/ag-grid-component.module';
import { ControlpanelModule } from './../../shared/controlpanel/controlpanel.module';
import { UikitModule } from './../../shared/uikit/uikit.module';
import { ContactModule } from './../contact/contact.module';
import { ContactDetailComponent } from './../contact/detail/contact-detail.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserModalComponent } from './modal/user-modal.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, UserDetailComponent, UserModalComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgSelectModule,
    UikitModule,
    ControlpanelModule,
    NgbModule,
    AgGridModule,
    ContactModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
  ],
  entryComponents: [UserModalComponent, ContactDetailComponent]
})
export class UserModule { }
