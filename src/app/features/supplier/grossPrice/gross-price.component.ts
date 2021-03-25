import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, iif, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { CounterupModel } from 'src/app/core/component/counterup/model/counterupModel';
import { ListSupplierIndexModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';

@Component({
  selector: 'app-gross-price',
  templateUrl: './gross-price.component.html',
  styles: [``],
})
export class GrossPriceComponent implements OnInit {
  @Input() id: number = 0;
  @Input() subId: number = 0;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  subscription: Subscription[] = [];

  private response$ = this.loaded$.pipe(map(() => { return { Id: this.id, SubId: this.subId } }));

  ngOnChanges(changes: SimpleChanges) {
    this.loaded$.next(true);
  }
  public listinoSupplierIndex$ = this.response$.pipe(
    switchMap((sm) => iif(() => sm != null && sm.Id > 0 && sm.SubId > 0,
      this.supplierService.ListSupplierIndex({ pId: sm?.Id, pSubId: sm?.SubId })
    )), shareReplay(1)
  )


  public Yb$ = this.listinoSupplierIndex$.pipe(
    map((lsim: ListSupplierIndexModel) => {
      const cm: CounterupModel = new CounterupModel();
      cm.Title = `Anno precedente`;
      cm.ValoreSx = lsim.IdxYbYb1?.toString();
      cm.Symbol = '%';
      return cm;
    }
    )
  )

  public Cy$ = this.listinoSupplierIndex$.pipe(
    map((lsim: ListSupplierIndexModel) => {
      const cm: CounterupModel = new CounterupModel();
      cm.Title = `Anno corrente`;
      cm.ValoreSx = lsim.IdxCyYb?.toString();
      cm.Symbol = '%';
      return cm;
    }
    )
  )

  constructor(private supplierService: SupplierService) { }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    this.loaded$.next(null);
  }

  ngOnInit(): void {
  }

}
