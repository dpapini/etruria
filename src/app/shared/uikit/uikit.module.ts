import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './component/input-text/input-text.component';
import { InputNumberComponent } from './component/input-number/input-number.component';
import { NavtabComponent } from './component/navtab/navtab.component';
import { FormsModule } from '@angular/forms';
import { InputPasswordComponent } from './component/input-password/input-password.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputPasswordComponent,
    InputNumberComponent,
    NavtabComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    NavtabComponent,
  ]
})
export class UikitModule { }
