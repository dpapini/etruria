import { ChangeDetectionStrategy, Component, Input, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { filter, first, map, skipWhile, take } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierSearch } from 'src/app/core/component/supplier/model/supplier';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { getSupplierFirstAgreement, getSupplierSecondAgreement } from '../store/supplier.actions';
import { SupplierFirstAgreementModel } from './../../../core/component/supplier/model/supplierAgreement';
import { getFirstAgreement, getFirstAgreementByLine, getListinoSupplier, getListinoSupplierByLine, getListLineAllPurchased, getPurchasedValueByYearLine, getSecondAgreement } from './../store/supplier.selectors';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[]): any {
    if (!items) return items;
    return [...new Set(items.map(item => item.TyLine))].map(tyLine => {
      return {
        TyLine: tyLine,
        Label: items.find(s => s.TyLine === tyLine).Label
      }
    })
  }
}

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgreementComponent implements OnInit {
  @Input() id: number = 0;
  @Input() subId: number = 0;

  wizzardCollection = ['I BenchMark', 'II BenchMark', 'III BenchMark'];
  wizzardClassText = 'nav nav-pills justify-content-end nav-sm';
  wizardStep: number = 0;
  subscription = new Subscription();
  data$ = this.store.pipe(select(getFirstAgreement))
  listino$ = this.store.pipe(select(getListinoSupplier));
  data2$ = this.store.pipe(select(getSecondAgreement))

  constructor(private store: Store<AppState>, private supplierService: SupplierService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { id, subId } = changes;
    if (!(id && subId)) return;
    const supplierSearch = { pId: id.currentValue, pSubId: subId.currentValue }
    this.store.dispatch(getSupplierFirstAgreement({ supplierSearch }));

    const pCY$ = this.store.pipe(select(getListLineAllPurchased(new Date().getFullYear())), skipWhile(p => p.length === 0), take(1));
    const pBY$ = this.store.pipe(select(getListLineAllPurchased(new Date().getFullYear() - 1)), skipWhile(p => p.length === 0), take(1));
    forkJoin([pCY$, pBY$]).subscribe(([pCy, pBy]) => {
      this.store.dispatch(getSupplierSecondAgreement({ supplierSearch, purchasesCY: pCy, purchasesBY: pBy }))
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public getBenchMark(item) {
    //costo del contratto
    //(100-(100*(1-B9)*(1-B25)))/100
    const contractCostYB = 100 * (1 - (item.hYB / 100)) * (1 - (item.pYB / 100))
    const contractCostCY = 100 * (1 - (item.hCY / 100)) * (1 - (item.pCY / 100))
    return contractCostCY - contractCostYB;
  }
  getbenchMarkValue(item) {
    return this.store.pipe(select(getPurchasedValueByYearLine(new Date().getFullYear() - 1, item.TyLine))).pipe(
      filter(v => v != null && v != undefined),
      map(v => {
        const x = this.getBenchMark(item);
        const t = (this.getBenchMark(item) * v / 100).toFixed(0);
        return t;
      })
    );
  }

  public getBenchMark2(item) {
    const contractCostYB = 100 * (1 - (item.hYB / 100)) * (1 - (item.pYB / 100))
    const contractCostCY = 100 * (1 - (item.hCY / 100)) * (1 - (item.pCY / 100))
    let costoContrattoCy2;
    return this.listino$.pipe(map(list => {
      const pc = list.filter(l => l.TyLine === item.TyLine)[0]?.PcList || 0;
      costoContrattoCy2 = contractCostCY * (1 + (pc / 100));
      return costoContrattoCy2 - contractCostYB;
    }))
  }
  getbenchMarkValue2(item) {
    const pvbyl$ = this.store.pipe(select(getPurchasedValueByYearLine(new Date().getFullYear() - 1, item.TyLine)), take(1), filter(v => v != null && v != undefined));
    const bench2$ = this.getBenchMark2(item).pipe(take(1));
    return forkJoin([pvbyl$, bench2$]).pipe(
      map(([pvbyl, bench2]) => (bench2 * pvbyl / 100).toFixed(0))
    )
  }
  public getBenchMark3(item) {
    // console.log(item)
    let contractCostYB;
    let costoContrattoCy2;
    let costoContrattoYb3;
    let costoContrattoCy3;

    const fal$ = this.store.pipe(select(getFirstAgreementByLine(item.TyLine)), take(1));
    const lis$ = this.store.pipe(select(getListinoSupplierByLine(item.TyLine)), take(1));

    return forkJoin({ firstAgreemnet: fal$, listino: lis$ }).pipe(
      map(response => {
        const pc = response.listino[0]?.PcList || 0;
        const itemFirst = response.firstAgreemnet[0];
        contractCostYB = 100 * (1 - (itemFirst?.hYB / 100)) * (1 - (itemFirst?.pYB / 100))
        costoContrattoYb3 = contractCostYB - item.pYB; //costo contratto 3

        const contractCostCY = 100 * (1 - (itemFirst?.hCY / 100)) * (1 - (itemFirst?.pCY / 100))
        costoContrattoCy2 = contractCostCY * (1 + (pc / 100));
        costoContrattoCy3 = costoContrattoCy2 - item.pCY;

        return costoContrattoCy3 - costoContrattoYb3;
      }));

  }
  getbenchMarkValue3(item) {
    const pvbyl$ = this.store.pipe(select(getPurchasedValueByYearLine(new Date().getFullYear() - 1, item.TyLine)), take(1));
    const bench3$ = this.getBenchMark3(item).pipe(take(1));
    return forkJoin([pvbyl$, bench3$]).pipe(
      map(([pvbyl, bench3]) => (bench3 * pvbyl / 100).toFixed(0))
    )
  }
}
