import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Pipe, PipeTransform } from '@angular/core';
import { getPurchasedValueByLine } from '../../store/supplier.selectors';

@Pipe({
  name: 'purchasedLineValue'
})
export class PurchasedLineValuePipe implements PipeTransform {
  constructor(private store: Store) { }

  transform(value: any): Observable<any> {
    return this.store.select(getPurchasedValueByLine(value))
  }

}
