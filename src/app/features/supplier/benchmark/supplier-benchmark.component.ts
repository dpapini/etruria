import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { getSupplier } from '../store/supplier.selectors';

@Component({
  selector: 'app-supplier-benchmark',
  templateUrl: './supplier-benchmark.component.html',
  styles: [``]
})
export class SupplierBenchmarkComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  private route$ = this.route.params.pipe(map(p => p));

  public supplier$ = this.route$.pipe(
    switchMap((p: Params) => {
      const id: number = +p.Id.split('.')[0]
      const subId: number = +p.Id.split('.')[1];
      return this.store.pipe(select(getSupplier(id, subId)))
    })
  );

  constructor(private route: ActivatedRoute, private router: Router,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void { }

  listSupplierClick(e: Event) {
    e.preventDefault();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }
}
