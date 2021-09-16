import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { getPurchasedValue, getPurchasedValueAtDate, getPurchasedYear } from '../../store/supplier.selectors';
import { getListLine } from './../../store/supplier.selectors';

@Component({
  selector: 'app-purchased-modal',
  templateUrl: './purchased-modal.component.html',
  styles: [`
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchasedModalComponent implements OnInit {

  purchasedYears$: Observable<number[]> = this.store.pipe(select(getPurchasedYear));
  purchasedBeforeYears$: Observable<number[]> = this.store.pipe(select(getPurchasedYear));
  purchasedValue$: Observable<number[]> = this.store.pipe(select(getPurchasedValue));
  purchasedValueAtData$: Observable<number> = this.store.pipe(select(getPurchasedValueAtDate));
  listLine$: Observable<any[]> = this.store.pipe(select(getListLine));

  constructor(public activeModal: NgbActiveModal, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
