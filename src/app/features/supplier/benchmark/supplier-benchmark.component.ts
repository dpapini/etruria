import { getBeforeYear, getCurrentYear } from './../store/supplier.selectors';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { SupplierModel, SupplierSearch } from 'src/app/core/component/supplier/model/supplier';
import { clearDataSupplier, setSupplier } from '../store/supplier.actions';
import { getSupplier } from '../store/supplier.selectors';
import { PurchasedModalComponent } from './../modal/purchased-modal/purchased-modal.component';

@Component({
  selector: 'app-supplier-benchmark',
  templateUrl: './supplier-benchmark.component.html',
  styles: [``]
})
export class SupplierBenchmarkComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  supplier$: Observable<SupplierModel>;
  cy = this.store.select(getCurrentYear);
  by = this.store.select(getBeforeYear)

  constructor(private route: ActivatedRoute, private router: Router,
    private modalService: NgbModal,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(p => +p.Id > 0),
      map(p => {
        const supplierSearch: SupplierSearch = { pId: +p.Id, pSubId: +p.SubId };

        this.store.dispatch(setSupplier({ supplierSearch }));
        return supplierSearch;
      })
    ).subscribe((ss: SupplierSearch) =>
      this.supplier$ = this.store.pipe(select(getSupplier(ss.pId, ss.pSubId)))
    );
  }

  onclickBtnRedo(e: Event) {
    console.log('onclickBtnRedo');
  }

  listSupplierClick(e: Event) {
    this.router.navigateByUrl('/Home/Supplier');
    this.store.dispatch(clearDataSupplier())
  }

  listChartLineClick(e: Event) {
    const m = this.modalService.open(PurchasedModalComponent, { backdropClass: 'light-blue-backdrop', size: 'xl' }).result.then((result) => { }, (reason) => { });
  }
}
