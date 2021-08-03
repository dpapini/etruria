import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Dashboard',
        loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'User',
        loadChildren: () => import('src/app/features/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'Supplier',
        loadChildren: () => import('src/app/features/supplier/supplier.module').then(m => m.SupplierModule)
      },
      {
        path: 'Contact',
        loadChildren: () => import('src/app/features/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: '', pathMatch: 'full',
        loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: 'Login',
    loadChildren: () => import('src/app/core/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
