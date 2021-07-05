import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { getPurchasedYear, getPurchasedValue } from '../../store/supplier.selectors';

@Component({
  selector: 'app-purchased-modal',
  templateUrl: './purchased-modal.component.html',
  styles: [``]
})
export class PurchasedModalComponent implements OnInit {

  purchasedYears$: Observable<number[]> = this.store.pipe(select(getPurchasedYear));
  purchasedValue$: Observable<number[]> = this.store.pipe(select(getPurchasedValue));

  constructor(public activeModal: NgbActiveModal, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}