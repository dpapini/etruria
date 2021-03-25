import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, iif, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';

@Component({
  selector: 'app-idx-line-price',
  templateUrl: './idx-line-price.component.html',
  styles: [``]
})
export class IdxLinePriceComponent implements OnInit {
  @Input() id: number;
  @Input() subId: number;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  subscription: Subscription[] = [];
  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;

  private response$ = this.loaded$.pipe(map(() => { return { Id: this.id, SubId: this.subId } }));

  public rowData$ = this.response$.pipe(
    switchMap((sm) => iif(() => sm != null && sm.Id > 0 && sm.SubId > 0,
      this.supplierService.DetectionPriceBySupplier({ pIdSupplier: sm?.Id, pSubIdSupplier: sm?.SubId })
    )), shareReplay(1)
  );

  constructor(private supplierService: SupplierService) {
    this.columnDefs = [
      { headerName: 'Cd. Area', field: 'CdArea', hide: true },
      { headerName: 'Cd. Settore', field: 'CdSector', hide: true },
      { headerName: 'Area', field: 'LabelArea', },
      { headerName: 'Settore', field: 'LabelSector', },
      { headerName: 'Express', field: 'Express', },
      { headerName: 'Market', field: 'Market', },
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
        this.gridApi.setSideBarVisible(true);
      },
      onGridSizeChanged: () => {
        this.gridApi.sizeColumnsToFit();
        this.gridApi.hideOverlay();
      },
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loaded$.next(true);
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    this.loaded$.next(null);
  }

  ngOnInit(): void { }


}
