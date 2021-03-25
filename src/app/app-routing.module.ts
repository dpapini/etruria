import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';


const routes: Routes = [
  {
    path: 'Home',
    canLoad: [AuthGuardService],
    loadChildren: () => import('./core/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'Login',
    loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/Home',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/Home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
