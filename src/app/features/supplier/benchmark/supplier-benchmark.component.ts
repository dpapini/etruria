import { PurchasedModalComponent } from './../modal/purchased-modal/purchased-modal.component';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { getSupplier } from '../store/supplier.selectors';
import { clearDataSupplier } from '../store/supplier.actions';

@Component({
  selector: 'app-supplier-benchmark',
  templateUrl: './supplier-benchmark.component.html',
  styles: [``]
})
export class SupplierBenchmarkComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  showEditCY = false;
  showEditBY = false;
  @ViewChild('currentYear', { read: ElementRef }) currentYear: ElementRef
  @ViewChild('beforeYear', { read: ElementRef }) beforeYear: ElementRef

  private route$ = this.route.params.pipe(map(p => p));

  public supplier$ = this.route$.pipe(
    switchMap((p: Params) => {
      const id: number = +p.Id.split('.')[0]
      const subId: number = +p.Id.split('.')[1];
      return this.store.pipe(select(getSupplier(id, subId)))
    })
  );

  constructor(private route: ActivatedRoute, private router: Router,
    private modalService: NgbModal,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void { }

  onFocusNumber(e) {
    const target = e.currentTarget;
    target.type = "text";
    target.setSelectionRange(0, target.value.length);
    target.type = "number";
  }

  onClickLabelCurrentYear(e: any) {
    this.showEditCY = !this.showEditCY;
    setTimeout(() => { this.currentYear.nativeElement.focus(); })
  }
  onClickLabelBeforeYear(e: any) {
    this.showEditBY = !this.showEditBY;
    setTimeout(() => { this.beforeYear.nativeElement.focus(); })
  }
  onclickBtnRedo(e: Event) {
    console.log('onclickBtnRedo');
  }

  listSupplierClick(e: Event) {
    e.preventDefault();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
    this.store.dispatch(clearDataSupplier())
  }
  listChartLineClick(e: Event) {
    e.preventDefault();
    const m = this.modalService.open(PurchasedModalComponent, { backdropClass: 'light-blue-backdrop' }).result.then((result) => { }, (reason) => { });
  }
}
