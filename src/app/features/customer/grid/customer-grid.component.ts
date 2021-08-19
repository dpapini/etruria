import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { CustomerModel, CustomerSearch } from './../../../core/component/customer/model/customer';
import { CustomerService } from './../../../core/component/customer/service/customer.service';

@Component({
  selector: 'app-customer-grid',
  template: `
    <div class="d-flex filter-panel" *ngIf="showFilterPanel">
      <app-customer-filter (onFilterClick)="showFilterPanel=$event"></app-customer-filter>
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

  rowData$: Observable<CustomerModel[]>;

  constructor(private router: Router, public route: ActivatedRoute,
    private customerService: CustomerService) {
    this.columnDefs = [
      {
        headerName: 'Id', field: 'Id', width: 80,
        minWidth: 80,
        maxWidth: 100
      },
      {
        headerName: 'Anagrafe', field: 'BusinessName'
      },
      {
        headerName: 'Cf', field: 'CdFiscale',
      },
      {
        headerName: 'Piva', field: 'PartivaIva',
      },
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
      defaultColDef: { sortable: true, resizable: true },
      enableCellTextSelection: true,
      cacheBlockSize: 10,
      maxBlocksInCache: 2,
      rowSelection: 'single',
      rowModelType: 'infinite',
      pagination: true,
      paginationPageSize: 10,
      domLayout: 'autoHeight',
      onGridSizeChanged: () => {
        this.gridApi.sizeColumnsToFit();
        this.gridApi.hideOverlay();
      },
      onRowDoubleClicked: () => {
        this.getSelectedRows();
      },
    };
  }

  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    let count = 0;
    let lastRow = -1;

    const datasource = {
      getRows: (params) => {
        this.subscription.add(
          this.getRowData(params.startRow, this.gridOptions.cacheBlockSize)
            .subscribe(data => {
              if (data && data.length > 0) {
                count += data.length;
              } else { lastRow = count + data.length; }
              params.successCallback(data, lastRow);
            }));
      }
    };
    params.api.setDatasource(datasource);
  }

  private getRowData(startRow: number, endRow: number): Observable<any> {
    const cs = { OffSet: startRow, NextRow: endRow } as CustomerSearch;
    return this.customerService.CustomerCollection(cs)
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
}
