import { getSuppliers, getSuppliersFailure, getSuppliersSuccess } from './supplier.actions';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { environment } from '../../../../environments/environment';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
   })
};

@Injectable()
export class SuppliersEffects {
   constructor(private actions$: Actions,
      private http: HttpClient) {
   }

   getSuppliers$ = createEffect(() =>
      this.actions$.pipe(
         ofType(getSuppliers),
         switchMap(action => {
            const param = new HttpParams({
               fromObject: {
                  pId: (action.supplierSearch.pId ? action.supplierSearch.pId.toString().trim() : ''),
                  pSubId: (action.supplierSearch.pSubId ? action.supplierSearch.pSubId.toString().trim() : ''),
                  pLabel: (action.supplierSearch.pLabel ? action.supplierSearch.pLabel.toString().trim() : ''),
                  pOffSet: (action.supplierSearch.pOffSet ? action.supplierSearch.pOffSet.toString().trim() : ''),
                  pNextRow: (action.supplierSearch.pNextRow ? action.supplierSearch.pNextRow.toString().trim() : ''),
               }
            });
            return this.http.get(environment.apiUrl + 'supplier/SupplierCollection', { params: param }).pipe(
               map((suppliersModel: SupplierModel[]) => getSuppliersSuccess({ suppliersModel })),
               catchError(error => of(getSuppliersFailure))
            )
         })
      )
   );
}

