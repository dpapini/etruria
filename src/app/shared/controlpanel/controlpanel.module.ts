import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlpanelComponent } from './controlpanel.component';

@NgModule({
  declarations: [ControlpanelComponent],
  imports: [
    CommonModule
  ],
  exports: [ControlpanelComponent]
})
export class ControlpanelModule { }
