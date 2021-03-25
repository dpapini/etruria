import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterupComponent } from './counterup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CounterupComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CounterupComponent
  ]

})
export class CounterupModule { }
