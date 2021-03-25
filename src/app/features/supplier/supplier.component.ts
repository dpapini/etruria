import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AgGridBenchmarkBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-benchmark-btn-cell-render copy';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierSearch } from './../../core/component/supplier/model/supplier';
import { getSuppliers } from './store/supplier.actions';
import { getSupplier, getSupplierList } from './store/supplier.selectors';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [``]
})
export class SupplierComponent implements OnInit {
  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;
  subscription: Subscription[] = [];
  rowData$: Observable<SupplierModel[]> = this.store.pipe(select(getSupplierList))
  supplier$: Observable<SupplierModel>;

  constructor(private router: Router, public route: ActivatedRoute, private store: Store<AppState>) {
    this.columnDefs = [
      {
        headerName: 'Id', field: 'Id', hide: true
      },
      {
        headerName: 'SubId', field: 'SubId', hide: true
      },
      {
        headerName: 'Id', width: 80, minWidth: 80, maxWidth: 120,
        valueGetter: (params) => {
          if (params.data.Id == null || params.data.SubId == null) return;
          return params.data.Id + '.' + params.data.SubId;
        },
      },
      {
        headerName: 'Ragione sociale', field: 'BusinessName',
      },

      {
        cellRendererFramework: AgGridBenchmarkBtnCellRenderer,
        maxWidth: 63,
        cellRendererParams: {
          onClick: this.getSelectedRowsByButton.bind(this),
        }
      }
    ];

    this.gridOptions = {
      columnDefs: this.columnDefs,
      defaultColDef: { filter: true, sortable: true, resizable: true },
      enableCellTextSelection: true,
      rowSelection: 'single',
      pagination: true,
      paginationPageSize: 10,
      domLayout: 'autoHeight',
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.showLoadingOverlay();
      },
      onGridSizeChanged: () => {
        this.gridApi.sizeColumnsToFit();
        this.gridApi.hideOverlay();
      },
    };

  }

  ngOnInit(): void {
    const supplierSearch: SupplierSearch = {};
    this.store.dispatch(getSuppliers({ supplierSearch }));
  }

  getSelectedRowsByButton(e) {
    this.router.navigate(['Benchmark', e.rowData.Id + '.' + e.rowData.SubId], { relativeTo: this.route });
  }

  onFilterChanged(e: Event) {
    this.gridOptions.api.setQuickFilter((e.target as HTMLInputElement).value);
  }
}
