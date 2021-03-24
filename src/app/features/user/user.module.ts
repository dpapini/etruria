import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UikitModule } from './../../shared/uikit/uikit.module';
import { AgGridComponentModule } from './../../core/component/aggrid/ag-grid-component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserModalComponent } from './modal/user-modal.component';
import { UsersReducer, UsersState } from './store/user.reducer';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/user.effects';

export interface UserState {
  EtruriaUsers: UsersState;
}

const reducers: ActionReducerMap<UserState> = {
  EtruriaUsers: UsersReducer,
};

@NgModule({
  declarations: [UserComponent, UserDetailComponent, UserModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AgGridComponentModule,
    NgSelectModule,
    UikitModule,
    NgbModule,
    AgGridModule,
    AgGridModule.withComponents([AgGridSelectBtnCellRenderer]),
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([UsersEffects])

  ],
  entryComponents: [UserModalComponent]
})
export class UserModule { }
