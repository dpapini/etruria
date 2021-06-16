import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CounterupModel } from 'src/app/core/component/counterup/model/counterupModel';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { setSupplierListino } from '../store/supplier.actions';
import { AppState } from './../../../app.module';
import { ListSupplierSearch } from './../../../core/component/supplier/model/listSupplier';
import { getListinoSupplier } from './../store/supplier.selectors';

@Component({
  selector: 'app-gross-price',
  templateUrl: './gross-price.component.html',
  styles: [``],
})
export class GrossPriceComponent implements OnInit {
  @Input() id: number = 0;
  @Input() subId: number = 0;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  rowData$: Observable<ListSupplierIndexDetailModel[]> = this.store.pipe(select(getListinoSupplier));

  subscription: Subscription[] = [];
  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;

  private response$ = this.loaded$.pipe(map(() => { return { Id: this.id, SubId: this.subId } }));

  public idxTotal$ = this.rowData$.pipe(map((rows: ListSupplierIndexDetailModel[]) => {
    let imCy = 0;
    let imGrow = 0;
    for (let index = 0; index < rows.length; index++) {
      imCy += rows[index].ImCy;
      imGrow += rows[index].ImGrowList;
    }

    const cm: CounterupModel = new CounterupModel();
    cm.Title = `Listino Y/YB`;
    cm.ValoreSx = (imGrow / imCy * 100).toFixed(3);
    cm.Symbol = '%';
    cm.ColorProgressBar = +cm.ValoreSx > 0 ? 'bg-danger' : 'bg-success';
    return cm;
  }
  ));


  constructor(private store: Store<AppState>) {

    this.columnDefs = [
      { headerName: 'Linea', field: 'TyLine', minWidth: 90, maxWidth: 90 },
      { headerName: 'Descrizione', field: 'Label', },
      { headerName: '%', field: 'PcList', valueFormatter: params => params.data.PcList.toFixed(3), minWidth: '80', maxWidth: '130' },
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

  ngOnChanges(changes: SimpleChanges) {
    const { id, subId } = changes;
    if (!(id && subId)) return;
    const listSupplierSearch: ListSupplierSearch = { pId: id.currentValue, pSubId: subId.currentValue, pYear: new Date().getFullYear() }
    this.store.dispatch(setSupplierListino({ listSupplierSearch }));

    this.loaded$.next(true);
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    this.loaded$.next(null);
  }

  ngOnInit(): void {
  }

}
