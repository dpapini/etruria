import { filterContact } from './../store/filter.actions';
import { ContactSearch } from './../../../core/component/contact/model/contactModel';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { ContactModel, ContactTypeSearch } from 'src/app/core/component/contact/model/contactModel';
import { ContactService } from 'src/app/core/component/contact/service/contact.service';
import { UserDetailComponent } from '../../user/detail/user-detail.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-contact-grid',
  template: `
    <div class="d-flex filter-panel" *ngIf="showFilterPanel">
      <dp-contatto-filter class="w-100" (onFilterClick)="onFilterClick($event)" [filterContact]="filterContact"></dp-contatto-filter>
    </div>

    <div class="row justify-content-end" style="margin:0 -5px 0 -5px">
      <button class="btn btn-md btn-light mb-1 mr-1" type="button" title="Filtra" (click)="onFilterChanged($event)">
        <fa-icon [icon]="['fas','filter']"></fa-icon>
      </button>
      <ag-grid-angular style="width: 100%;height: 100%;" class="ag-theme-alpine" [gridOptions]="gridOptions"
        [suppressDragLeaveHidesColumns]="true" (gridReady)="onGridReady($event)">
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class ContactGridComponent implements OnInit {
  @Input() filterContact: ContactSearch;
  @Output() gridClicked: EventEmitter<any> = new EventEmitter();

  subscription = new Subscription();
  showFilterPanel = false;
  contactSearch: ContactSearch = { OffSet: 0, NextRow: 0 }

  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;
  constructor(private contactService: ContactService,
    private store: Store,
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
      rowModelType: 'infinite',
      pagination: true,
      paginationPageSize: 10,
      domLayout: 'autoHeight',
      cacheBlockSize: 100,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    const _fc = changes.filterContact;
    if (_fc && _fc.currentValue) {
      this.gridApi?.purgeInfiniteCache();
      this.gridApi?.setInfiniteRowCount(null, false);
      this.contactSearch = _fc.currentValue
      this.getRowData(0, -1);
    }
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
              if (data && data.length > 0) {
                lastRow = params.startRow + data.length;
              }
              lastRow = lastRow <= params.endRow && data.length !== this.gridOptions.cacheBlockSize ? lastRow : -1;
              if (data.length === 0) lastRow = 0;

              params.successCallback(data, lastRow);
            }));
      }
    }
    this.gridApi.setDatasource(datasource);
    this.gridApi.hideOverlay();
  }

  private getRowData(startRow: number, endRow: number): Observable<any> {
    console.log('getRowData', startRow, endRow, this.contactSearch)
    return this.contactService.ContactCollection({ ...this.contactSearch, OffSet: startRow, NextRow: endRow })
  }

  onFilterClick(e: any) {
    this.showFilterPanel = e.filterPanel;
    if (e.data || e.reset) {
      this.store.dispatch(filterContact({ cs: e.data }));

      this.gridApi?.purgeInfiniteCache();
      this.gridApi?.setInfiniteRowCount(null, false);
      this.contactSearch = e.data || {};
      this.getRowData(0, -1);
    }
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
      // this.router.navigateByUrl(`/Home/Contact/Detail/${e.rowData.Id}`);
    }
  }

  onFilterChanged(e: Event) {
    // this.gridOptions.api.setQuickFilter((e.target as HTMLInputElement).value);
    this.showFilterPanel = !this.showFilterPanel;
  }
}
