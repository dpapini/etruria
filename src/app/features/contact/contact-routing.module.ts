import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './detail/contact-detail.component';

const routes: Routes = [
  {
    path: ''
    , component: ContactComponent,
    children: [
      {
        path: 'Detail/:Id',
        component: ContactDetailComponent,
      },
      {
        path: 'Detail',
        component: ContactDetailComponent,
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
