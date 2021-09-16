import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierBenchmarkComponent } from './benchmark/supplier-benchmark.component';
import { SupplierComponent } from './supplier.component';


const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      {
        path: 'Benchmark/:Id/:SubId',
        component: SupplierBenchmarkComponent,
      },
      // {
      //   path: 'Detail/:Id',
      //   component: UserDetailComponent,
      // }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
