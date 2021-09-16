import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { CustomerSearch } from './../../../core/component/customer/model/customer';
import { CustomerService } from './../../../core/component/customer/service/customer.service';

@Component({
  selector: 'app-customer-grid',
  template: `
    <div class="d-flex filter-panel" *ngIf="showFilterPanel">
      <app-customer-filter (onFilterClick)="onFilterClick($event)"></app-customer-filter>
    </div>

    <div class="row justify-content-end" style="margin:0 -5px 0 -5px">
      <button class="btn btn-md btn-light mb-1 mr-1" type="button" title="Filtra"
        (click)="onFilterChanged($event)">
        <fa-icon [icon]="['fas','filter']"></fa-icon>
      </button>
      <ag-grid-angular style="width: 100%;height: 100%;" class="ag-theme-alpine"
        [gridOptions]="gridOptions"
        [suppressDragLeaveHidesColumns]="true"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  `,
  styles: [`
    .filter-panel{
      position:fixed;
      z-index:1;
      top:180px;
      right:35px;
      width:300px;
      height:70%;
      box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
      background-color:#fff;
    }
    .filter-panel .card{
        border:0;
    }
  `]
})
export class CustomerGridComponent implements OnInit {
  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;
  subscription = new Subscription();
  showFilterPanel = false;
  customerSearch: CustomerSearch = { OffSet: 0, NextRow: 0 };

  constructor(private router: Router, public route: ActivatedRoute,
    private customerService: CustomerService) {
    this.columnDefs = [
      {
        headerName: 'Id', field: 'Id', width: 80,
        minWidth: 80,
        maxWidth: 100
      },
      { headerName: 'Anagrafe', field: 'BusinessName' },
      { headerName: 'Cf', field: 'CdFiscale', },
      { headerName: 'Piva', field: 'PartivaIva', },
      {
        cellRendererFramework: AgGridSelectBtnCellRenderer,
        maxWidth: 63,
        cellRendererParams: {
          onClick: this.getSelectedRowsByButton.bind(this),
        }
      }
    ];

    this.gridOptions = {
      columnDefs: this.columnDefs,
      enableCellTextSelection: true,
      rowSelection: 'single',
      rowModelType: 'infinite',
      pagination: true,
      paginationPageSize: 10,
      domLayout: 'autoHeight',
      cacheBlockSize: 100,
      onGridSizeChanged: () => {
        this.gridApi.sizeColumnsToFit();
      },
      onRowDoubleClicked: () => {
        this.getSelectedRows();
      },
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    let lastRow = -1;

    const datasource = {
      getRows: (params) => {
        this.subscription.add(
          this.getRowData(params.startRow, params.endRow)
            .subscribe(data => {
              console.log(params.startRow, data.length)
              if (data && data.length > 0) {
                lastRow = params.startRow + data.length;
              }
              lastRow = lastRow <= params.endRow && data.length !== this.gridOptions.cacheBlockSize ? lastRow : -1;

              params.successCallback(data, lastRow);
            }));
      }
    }
    this.gridApi.setDatasource(datasource);
    this.gridApi.hideOverlay();
  }

  private getRowData(startRow: number, endRow: number): Observable<any> {
    return this.customerService.CustomerCollection({ ...this.customerSearch, OffSet: startRow, NextRow: endRow })
  }

  getSelectedRows() {
    const selectedRows = this.gridOptions.api.getSelectedRows();
    this.router.navigate(['Detail', selectedRows[0].Id], { relativeTo: this.route });
  }

  getSelectedRowsByButton(e) {
    this.router.navigate(['Detail', e.rowData.Id], { relativeTo: this.route });
  }

  onFilterChanged(e: Event) {
    e.preventDefault();
    this.showFilterPanel = !this.showFilterPanel;
  }

  onFilterClick(e: any) {
    this.showFilterPanel = e.filterPanel;
    if (e.data || e.reset) {
      // this.store.dispatch(filterContatto({ cs: e.data }));

      this.gridApi?.purgeInfiniteCache();
      this.gridApi?.setInfiniteRowCount(null, false);
      this.customerSearch = e.data || {};
      this.getRowData(0, -1);
    }
  }
}
