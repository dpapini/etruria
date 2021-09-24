import { ChangeDetectionStrategy, Component, Input, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { forkJoin, of, Subscription } from 'rxjs';
import { filter, map, skipWhile, switchMap, take, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { SupplierBenchModel } from 'src/app/core/component/supplier/model/supplierBench';
import { SupplierCrossModel } from 'src/app/core/component/supplier/model/supplierCross';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { addSupplierCrossLine, deleteSupplierCrossLine, getSupplierFirstAgreement, getSupplierSecondAgreement } from '../store/supplier.actions';
import { SupplierFirstAgreementModel } from './../../../core/component/supplier/model/supplierAgreement';
import { CrossLineModalComponent } from './../modal/cross-line-modal/cross-line-modal.component';
import { getBeforeYear, getCrossLine, getCurrentYear, getFirstAgreement, getFirstAgreementByLine, getListinoSupplier, getListinoSupplierByLine, getListLineAllPurchased, getPurchasedValueByYear, getPurchasedValueByYearLine, getSecondAgreement, getSupplier, getYearsBench } from './../store/supplier.selectors';

// @Pipe({
//   name: 'myfilter',
//   pure: false
// })
// export class MyFilterPipe implements PipeTransform {
//   transform(items: any[]): any {
//     if (!items) return items;
//     return [...new Set(items.map(item => item.TyLine))].map(tyLine => {
//       return {
//         TyLine: tyLine,
//         Label: items.find(s => s.TyLine === tyLine).Label
//       }
//     })
//   }
// }

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgreementComponent implements OnInit {
  @Input() id: number = 0;
  @Input() subId: number = 0;

  wizzardCollectionYear$ = this.store.select(getYearsBench);
  wizzardCollection = ['I BenchMark', 'II BenchMark', 'III BenchMark', 'Totale'];
  wizzardClassText = 'nav nav-pills justify-content-end nav-sm';
  wizardStep: number = 0;
  wizardYear: number;
  subscription = new Subscription();
  gearColor = '#413f3f';
  data$ = this.store.pipe(select(getFirstAgreement))
  listino$ = this.store.pipe(select(getListinoSupplier));
  data2$ = this.store.pipe(select(getSecondAgreement));

  dataTotale: SupplierBenchModel;

  constructor(private store: Store<AppState>
    , private modalService: NgbModal
    , private supplierService: SupplierService) {
  }

  ngOnInit(): void {
    this.store.select(getBeforeYear).subscribe(by => this.wizardYear = by);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    const { id, subId } = changes;
    if (!(id && subId)) return;
    const supplierSearch = { pId: id.currentValue, pSubId: subId.currentValue }
    this.store.dispatch(getSupplierFirstAgreement({ supplierSearch }));


    const pCY$ = this.store.select(getCurrentYear).pipe(
      switchMap(cy => this.store.select(getListLineAllPurchased(cy))),
      skipWhile(p => p.length === 0), take(1)
    );
    const pBY$ = this.store.select(getBeforeYear).pipe(
      switchMap(by => this.store.select(getListLineAllPurchased(by))),
      skipWhile(p => p.length === 0), take(1)
    );

    const bt$ = this.supplierService.BenchMarkTotale({ pId: id.currentValue, pSubId: subId.currentValue }).pipe(
      catchError(() => of({} as SupplierBenchModel))
    );

    this.subscription.add(forkJoin([pCY$, pBY$, bt$]).subscribe(([pCy, pBy, bt]) => {
      this.store.dispatch(getSupplierSecondAgreement({ supplierSearch, purchasesCY: pCy, purchasesBY: pBy }))
      this.dataTotale = bt;
    }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // listChartLineClick(e: Event) {
  //   e.preventDefault();
  //   const m = this.modalService.open(PurchasedModalComponent, { backdropClass: 'light-blue-backdrop', size: 'xl' }).result.then((result) => { }, (reason) => { });
  // }

  listCrossLineClick(e: Event, item: SupplierFirstAgreementModel) {
    e.preventDefault();
    const supplier$ = this.store.select(getSupplier(this.id, this.subId)).pipe(take(1));
    const by$ = this.store.select(getBeforeYear).pipe(take(1));
    const crossLine$ = this.store.select(getCrossLine(item.TyLine)).pipe(take(1));

    this.subscription.add(forkJoin({
      supplier: supplier$, by: by$, crossLine: crossLine$
    }).subscribe(({ supplier, by, crossLine }) => {
      const m = this.modalService.open(CrossLineModalComponent, { backdropClass: 'light-blue-backdrop', size: 'lg' });
      m.componentInstance.yearCross = by;
      m.componentInstance.supplierModel = supplier;
      m.componentInstance.supplierCrossModel = crossLine;

      m.result.then((result) => {
        const { action, data } = result;
        const scm: SupplierCrossModel = {
          Id: supplier.Id,
          SubId: supplier.SubId,
          Year: by,
          TyDiscountLine: item.TyLine,
          IdSupplier: data.Supplier.Id,
          SubIdSupplier: data.Supplier.SubId,
          TyDiscountLineCross: data.DiscountLine.TyDiscountLine,
          LabelDiscountLineCross: data.DiscountLine.Label,
          PcDiscountHeader: data.PcDiscountHeader,
          PcDiscountPremia: data.PcDiscountPremia,
        }
        if (action === 'save')
          this.store.dispatch(addSupplierCrossLine({ scm }))
        if (action === 'delete')
          this.store.dispatch(deleteSupplierCrossLine({ scm }))
      }, (reason) => {
        console.log('reason', reason);
      });
    }
    ));

  }

  getBenchMark(item) {
    //costo del contratto
    //(100-(100*(1-B9)*(1-B25)))/100
    const contractCostBY = 100 * (1 - (item.hBY / 100)) * (1 - (item.pBY / 100))
    const contractCostCY = 100 * (1 - (item.hCY / 100)) * (1 - (item.pCY / 100))
    return contractCostCY - contractCostBY;
  }

  getbenchMarkValue(item) {
    return this.store.pipe(select(getPurchasedValueByYearLine(this.wizardYear, item.TyLine)),
      filter(v => v != null && v != undefined),
      map(v => {
        const x = this.getBenchMark(item);
        const t = (this.getBenchMark(item) * v / 100).toFixed(0);
        return t;
      })
    );
  }

  getBenchMark2(item) {
    const contractCostBY = 100 * (1 - (item.hBY / 100)) * (1 - (item.pBY / 100))
    const contractCostCY = 100 * (1 - (item.hCY / 100)) * (1 - (item.pCY / 100))
    let costoContrattoCy2;
    return this.listino$.pipe(map(list => {
      const pc = list.filter(l => l.TyLine === item.TyLine)[0]?.PcList || 0;
      costoContrattoCy2 = contractCostCY * (1 + (pc / 100));
      return costoContrattoCy2 - contractCostBY;
    }))
  }

  getbenchMarkValue2(item) {
    const pvbyl$ = this.store.pipe(select(getPurchasedValueByYearLine(this.wizardYear, item.TyLine)),
      filter(v => v != null && v != undefined),
      take(1)
    )

    const bench2$ = this.getBenchMark2(item).pipe(take(1));
    return forkJoin([pvbyl$, bench2$]).pipe(
      map(([pvbyl, bench2]) => (bench2 * pvbyl / 100).toFixed(0))
    )
  }

  getBenchMark3(item) {
    let contractCostBY;
    let costoContrattoCy2;
    let costoContrattoBy3;
    let costoContrattoCy3;

    const fal$ = this.store.pipe(select(getFirstAgreementByLine(item.TyLine)), take(1));
    const lis$ = this.store.pipe(select(getListinoSupplierByLine(item.TyLine)), take(1));

    return forkJoin({ firstAgreemnet: fal$, listino: lis$ }).pipe(
      map(response => {
        const pc = response.listino[0]?.PcList || 0;
        const itemFirst = response.firstAgreemnet[0];
        contractCostBY = 100 * (1 - (itemFirst?.hBY / 100)) * (1 - (itemFirst?.pBY / 100))
        costoContrattoBy3 = contractCostBY - item.pBY; //costo contratto 3

        const contractCostCY = 100 * (1 - (itemFirst?.hCY / 100)) * (1 - (itemFirst?.pCY / 100))
        costoContrattoCy2 = contractCostCY * (1 + (pc / 100));
        costoContrattoCy3 = costoContrattoCy2 - item.pCY;

        return costoContrattoCy3 - costoContrattoBy3;
      }));
  }

  getbenchMarkValue3(item) {
    const pvbyl$ = this.store.pipe(select(getPurchasedValueByYearLine(this.wizardYear, item.TyLine)),
      filter(v => v != null && v != undefined),
      take(1)
    )

    const bench3$ = this.getBenchMark3(item).pipe(take(1));
    return forkJoin([pvbyl$, bench3$]).pipe(
      map(([pvbyl, bench3]) => {
        return (bench3 * pvbyl / 100).toFixed(0)
      }
      )
    )
  }

  getbenchMarkValueTotale() {
    return this.store.pipe(select(getPurchasedValueByYear(this.wizardYear)),
      filter(v => v != null && v != undefined),
      take(1),
      map(res => {
        return (res * this.dataTotale.Bench3 / 100).toFixed(2)
      }
      )
    )
  }

  getCrossLine(item: any) {
    return this.store.select(getCrossLine(item.TyLine)).pipe(map(c => c === null ? this.gearColor : '#f29d0a'));
  }

}
