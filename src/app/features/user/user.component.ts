import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { UserModel, UserSearch, UserTipologiaRicerca } from 'src/app/core/component/user/model/userModel';
import { UserService } from 'src/app/core/component/user/service/user.service';
import { UserModalComponent } from './modal/user-modal.component';
import { addUser, getUsers } from './store/user.actions';
import { getUserList } from './store/user.selectors';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [``],
})
export class UserComponent implements OnInit, AfterViewChecked {
  rowData$: Observable<UserModel[]> = this.store.pipe(select(getUserList))

  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;

  constructor(private router: Router, public route: ActivatedRoute, private modalService: NgbModal,
    private store: Store<AppState>, private cdref: ChangeDetectorRef,
  ) {
    this.columnDefs = [
      {
        headerName: 'Id', field: 'Id', width: 80,
        minWidth: 80,
        maxWidth: 100
      },
      {
        headerName: 'Utente', field: 'Userid'
      },
      {
        headerName: 'Stato', field: 'State.Label',
      },
      {
        headerName: 'Ruolo', field: 'Role.Label',
      },
      {
        headerName: 'Ultimo Acceso', field: 'TsLogged',
        cellRenderer: (data) => {
          return new DatePipe('it-IT').transform(data.value, 'medium');
        }
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
  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
  }
  onClickUserAdd(e: Event) {
    e.preventDefault();
    const m = this.modalService.open(UserModalComponent, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
      this.store.dispatch(addUser(result));
    }, (reason) => { });
  }

  ngOnInit(): void {
    const userSearch: UserSearch = { pTyRicerca: UserTipologiaRicerca.RICERCA };
    this.store.dispatch(getUsers({ userSearch }));
  }

  getSelectedRows() {
    const selectedRows = this.gridOptions.api.getSelectedRows();
    this.router.navigate(['Detail', selectedRows[0].Id], { relativeTo: this.route });
  }
  getSelectedRowsByButton(e) {
    this.router.navigate(['Detail', e.rowData.Id], { relativeTo: this.route });
  }
  onFilterChanged(e: Event) {
    this.gridOptions.api.setQuickFilter((e.target as HTMLInputElement).value);
  }

}