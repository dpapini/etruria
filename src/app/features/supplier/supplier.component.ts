import { SupplierService } from './../../core/component/supplier/service/supplier.service';
import { switchMap } from 'rxjs/operators';
import { getIdBuyer } from './../../core/component/store/login/login.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FilterChangedEvent } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AgGridBenchmarkBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-benchmark-btn-cell-render copy';
import { SupplierModel, SupplierSearch } from 'src/app/core/component/supplier/model/supplier';
import { SupplierBenchModel } from 'src/app/core/component/supplier/model/supplierBench';
import { RequestModel, TYPEREQUEST } from './../../core/component/request/request';
import { addEtruriaRequest, getSuppliers } from './store/supplier.actions';
import { getSupplierList } from './store/supplier.selectors';
import { getIdBuyerByUserid } from 'src/app/core/component/store/user/user.selectors';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [``]
})
export class SupplierComponent implements OnInit, OnDestroy {

  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;
  subscription: Subscription[] = [];
  rowData$: Observable<SupplierModel[]> = this.store.pipe(select(getSupplierList))
  dataTotale: SupplierBenchModel;

  constructor(private router: Router,
    private supplierService: SupplierService,
    public route: ActivatedRoute,
    private store: Store<AppState>) {
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
        headerName: 'Buyer', field: 'BuyerId',
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

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }
  ngOnChanges() { }
  ngAfterContentInit() { }
  ngAfterViewInit() { }

  ngOnInit(): void {
    if (this.route.children.length > 0) { return };
    const supplierSearch: SupplierSearch = {};
    this.store.dispatch(getSuppliers({ supplierSearch }));
  }

  getSelectedRowsByButton(e) {
    this.router.navigateByUrl(`Home/Supplier/Benchmark/${e.rowData.Id}/${e.rowData.SubId}`)
  }

  onFilterChanged(e: Event) {
    this.gridOptions.api.setQuickFilter((e.target as HTMLInputElement).value);
  }

  onFilterColumnChanged(params: FilterChangedEvent) {
    this.dataTotale = null;
    this.gridApi.filterManager.allAdvancedFilters.forEach(f => {
      if (f.column.colId === "BuyerId") {
        f.filterPromise.then(result => {
          console.log(result.virtualList.model.model.selectedValues, result.virtualList.model.model.selectedValues.length)
          if (result.virtualList.model.model.selectedValues.size === 1) {
            console.log('ho selezionato un buyer', result.virtualList.model.model.selectedValues.values().next().value)
            this.store.select(getIdBuyerByUserid(result.virtualList.model.model.selectedValues.values().next().value)).pipe(
              switchMap(id => this.supplierService.BenchMarkTotale({ pIdBuyer: id }))
            ).subscribe(bench => this.dataTotale = bench)

          }
        })
      }
    });
  }

  onClickBtnExcel(e: Event) {
    e.preventDefault();
    const etruriaRequest: RequestModel = new RequestModel();
    etruriaRequest.CdRequest = TYPEREQUEST[TYPEREQUEST.BENCHMARKXLSX];
    this.store.dispatch(addEtruriaRequest({ etruriaRequest }))
  }

}
