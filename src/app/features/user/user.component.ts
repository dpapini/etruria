import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AgGridSelectBtnCellRenderer } from 'src/app/core/component/aggrid/ag-grid-select-btn-cell-render';
import { UserModel, UserSearch, UserTipologiaRicerca } from 'src/app/core/component/user/model/userModel';
import { UserService } from 'src/app/core/component/user/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  rowData$: Observable<UserModel[]> | Observable<unknown> = this.userService.UserCollection({ pTyRicerca: UserTipologiaRicerca.RICERCA } as UserSearch);

  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;

  constructor(private router: Router, public route: ActivatedRoute,
    private userService: UserService) {
    this.columnDefs = [
      {
        headerName: 'Id.', field: 'Id', width: 80,
        minWidth: 80,
        maxWidth: 100
      },
      {
        headerName: 'Utente', field: 'Contatto.RagioneSociale'
      },
      {
        headerName: 'Stato', field: 'State.Testo',
      },
      {
        headerName: 'Ruolo', field: 'Role.Testo',
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

  ngOnInit(): void {
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