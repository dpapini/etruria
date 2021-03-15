import { AgGridComponentModule } from './../../core/component/aggrid/ag-grid-component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';


@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
  ]
})
export class UserModule { }
