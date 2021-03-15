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
        path: 'Utente',
        loadChildren: () => import('src/app/features/user/user.module').then(m => m.UserModule)
      },
      // {
      //   path: 'Contatto',
      //   loadChildren: () => import('src/app/features/contatto/contatto.module').then(m => m.ContattoModule)
      // },
      // {
      //   path: 'AnagrafeCliente',
      //   loadChildren: () => import('src/app/features/cliente/cliente.module').then(m => m.ClienteModule)
      // },
      // {
      //   path: 'AnagrafeArticolo',
      //   loadChildren: () => import('src/app/features/articolo/articolo.module').then(m => m.ArticoloModule)
      // },
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
