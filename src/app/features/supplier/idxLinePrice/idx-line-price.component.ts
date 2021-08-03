import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { CounterupModel } from 'src/app/core/component/counterup/model/counterupModel';
import { DetectionPriceModel, DetectionPriceTipologiaRicerca } from 'src/app/core/component/supplier/model/detectionPrice';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { LinePriceModalComponent } from '../modal/line-price-modal/line-price-modal.component';

@Component({
  selector: 'app-idx-line-price',
  templateUrl: './idx-line-price.component.html',
  styles: [``]
})
export class IdxLinePriceComponent implements OnInit {
  @Input() id: number;
  @Input() subId: number;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  idxLine$: BehaviorSubject<DetectionPriceModel> = new BehaviorSubject({} as DetectionPriceModel);
  idxTotal$: BehaviorSubject<DetectionPriceModel> = new BehaviorSubject({} as DetectionPriceModel);

  subscription: Subscription[] = [];
  columnDefs: any = [];
  gridApi;
  gridColumnApi;
  gridOptions;

  private response$ = this.loaded$.pipe(map(() => { return { Id: this.id, SubId: this.subId } }));

  public rowData$ = this.response$.pipe(
    filter(sm => sm != null && sm.Id > 0 && sm.SubId > 0),
    switchMap((sm) =>
      this.supplierService.DetectionPriceBySupplier({ pIdSupplier: sm?.Id, pSubIdSupplier: sm?.SubId, pTyRicerca: DetectionPriceTipologiaRicerca.SECTOR })
    ), shareReplay(1)
  );

  public express$ = this.idxLine$.pipe(
    map((dpm: DetectionPriceModel) => {
      return {
        Title: `Express`,
        ValoreSx: dpm.Express?.toFixed(1),
        Symbol: '%',
        ColorProgressBar: 'bg-success',
      } as CounterupModel
    })
  );

  public market$ = this.idxLine$.pipe(
    map((dpm: DetectionPriceModel) => {
      return {
        Title: `Market`,
        ValoreSx: dpm.Market?.toFixed(1),
        Symbol: '%',
        ColorProgressBar: 'bg-danger',
      } as CounterupModel
    })
  );

  public total$ = this.idxTotal$.pipe(
    map((dpm: DetectionPriceModel) => {
      return {
        Title: `Totale`,
        ValoreSx: dpm.Total?.toFixed(1),
        Symbol: '%',
        ColorProgressBar: 'bg-primary',
      } as CounterupModel
    })
  );

  constructor(private supplierService: SupplierService, private modalService: NgbModal) {
    this.columnDefs = [
      { headerName: 'Area', field: 'LabelArea', },
      { headerName: 'Settore', field: 'LabelSector', },
      { headerName: 'Express', field: 'Express', valueFormatter: params => params.data.Express.toFixed(1), minWidth: 100, maxWidth: 110 },
      { headerName: 'Market', field: 'Market', valueFormatter: params => params.data.Market.toFixed(1), minWidth: 100, maxWidth: 110 },
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
    this.loaded$.next(true);
    this.subscription.push(this.supplierService.DetectionPriceBylinea({ pIdSupplier: this.id, pSubIdSupplier: this.subId, pTyRicerca: DetectionPriceTipologiaRicerca.LINE }).subscribe(d => this.idxLine$.next(d)));
    this.subscription.push(this.supplierService.DetectionPriceByTotal({ pIdSupplier: this.id, pSubIdSupplier: this.subId, pTyRicerca: DetectionPriceTipologiaRicerca.TOTAL }).subscribe(d => this.idxTotal$.next(d)));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    this.loaded$.next(null);
    this.idxLine$.next(null);
  }

  indexPricingSettingsClick(e: Event) {
    e.preventDefault();
    const m = this.modalService.open(LinePriceModalComponent, { backdropClass: 'light-blue-backdrop' }).result.then((result) => {
      this.subscription.push(
        this.recalculation(result, this.id, this.subId).subscribe(
          res => {
            this.idxLine$.next(res.idxLine$);
          }
        ));
    }, (reason) => { });
  }

  recalculation(result, Id, SubId) {
    this.rowData$ = this.supplierService.DetectionPriceBySupplier({
      pIdSupplier: Id, pSubIdSupplier: SubId, pTyRicerca: DetectionPriceTipologiaRicerca.SECTOR,
      pIdLine: result.LinePriceCollection.filter(r => r.Checked).map(r => r.Id)
    }).pipe(shareReplay(1));

    const idxLine$ = this.supplierService.DetectionPriceBylinea({
      pIdSupplier: Id, pSubIdSupplier: SubId, pTyRicerca: 0,
      pIdLine: result.LinePriceCollection.filter(r => r.Checked).map(r => r.Id)
    });

    return forkJoin({ rd: this.rowData$, idxLine$ });

  }

  ngOnInit(): void { }


}
