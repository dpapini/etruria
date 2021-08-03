import { UserDetailComponent } from './detail/user-detail.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './profile/user-profile.component';

const routes: Routes = [
  {
    path: ''
    , component: UserComponent,
    children: [
      {
        path: 'Detail/:Id',
        component: UserDetailComponent,
      },
      {
        path: 'Profile',
        component: UserProfileComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
