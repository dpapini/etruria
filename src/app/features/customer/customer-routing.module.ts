import { CustomerDetailComponent } from './../../features/customer/detail/customer-detail.component';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CustomerComponent,
    children: [
      {
        path: 'Detail/:Id',
        component: CustomerDetailComponent,
      },
      {
        path: 'Detail',
        component: CustomerDetailComponent,
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
