import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridTrashBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-trash-btn-cell-render';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridBenchmarkBtnCellRenderer } from './ag-grid-benchmark-btn-cell-render copy';



@NgModule({
  declarations: [
    AgGridSelectBtnCellRenderer,
    AgGridTrashBtnCellRenderer,
    AgGridBenchmarkBtnCellRenderer,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    AgGridSelectBtnCellRenderer,
    AgGridTrashBtnCellRenderer,
    AgGridBenchmarkBtnCellRenderer,
  ]
})
export class AgGridComponentModule { }
