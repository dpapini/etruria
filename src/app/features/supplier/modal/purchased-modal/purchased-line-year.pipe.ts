import { getPurchasedYearByLine } from './../../store/supplier.selectors';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Pipe({
  name: 'purchasedLineYear'
})
export class PurchasedLineYearPipe implements PipeTransform {
  constructor(private store: Store) { }

  transform(value: any): Observable<any> {
    return this.store.select(getPurchasedYearByLine(value))
  }

}
