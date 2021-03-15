import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridTrashBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-trash-btn-cell-render';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AgGridSelectBtnCellRenderer,
    AgGridTrashBtnCellRenderer
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AgGridSelectBtnCellRenderer,
    AgGridTrashBtnCellRenderer
  ]
})
export class AgGridComponentModule { }
