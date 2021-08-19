import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { ContactModel, ContactTypeSearch } from 'src/app/core/component/contact/model/contactModel';
import { ContactService } from 'src/app/core/component/contact/service/contact.service';
import { UserDetailComponent } from '../../user/detail/user-detail.component';

@Component({
  selector: 'app-contact-grid',
  template: `
  <div class="row justify-content-end" style="margin:0 -5px 0 -5px">
  <input class="form-control form-control-sm col-2 mb-1" type="text" id="filter-text-box"
    placeholder="Cerca..." (input)="onFilterChanged($event)" />
  </div>
  <ag-grid-angular style="width: 100%;height: 100%;" class="ag-theme-alpine" [gridOptions]="gridOptions"
  [suppressDragLeaveHidesColumns]="true" [rowData]="rowData$|async"></ag-grid-angular>
            `,
  styles: [``]
})
export class ContactGridComponent implements OnInit {
  @Output() gridClicked: EventEmitter<any> = new EventEmitter();

  rowData$: Observable<ContactModel[]> = this.contactService.ContactCollection({ pTySearch: ContactTypeSearch.RICERCA });

  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;
  constructor(private contactService: ContactService,
    private router: Router, public route: ActivatedRoute,) {
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
      onRowDoubleClicked: () => {
        this.getSelectedRows();
      },
    };
  }

  ngOnInit(): void {
  }
  getSelectedRows() {
    const selectedRows = this.gridOptions.api.getSelectedRows();
    if (this.route.routeConfig.component === UserDetailComponent) {
      this.gridClicked.emit(this.contactService.ContactById(+selectedRows[0].Id));
    }
    else {
      this.router.navigate(['Detail', selectedRows[0].Id], { relativeTo: this.route });
    }
  }

  getSelectedRowsByButton(e) {
    if (this.route.routeConfig.component === UserDetailComponent) {
      this.gridClicked.emit(this.contactService.ContactById(+e.rowData.Id));
    }
    else {
      this.router.navigate(['Detail', e.rowData.Id], { relativeTo: this.route });
    }
  }

  onFilterChanged(e: Event) {
    this.gridOptions.api.setQuickFilter((e.target as HTMLInputElement).value);
  }
}
