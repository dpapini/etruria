import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, first, map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierPurchasedModel } from 'src/app/core/component/supplier/model/supplierPurchased';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { environment } from '../../../../environments/environment';
import { SupplierFirstAgreementModel, TipologiaAgreement, SupplierAgreementModel } from './../../../core/component/supplier/model/supplierAgreement';
import { getIdBuyer } from './../../../core/login/store/login.selectors';
import { getSupplierFirstAgreement, getSupplierFirstAgreementSuccess, getSuppliers, getSupplierSecondAgreement, getSupplierSecondAgreementFailure, getSuppliersFailure, getSuppliersSuccess, setSupplier, setSupplierListino, setSupplierListinoFailure, setSupplierListinoSuccess, setSupplierSuccess, getSupplierSecondAgreementSuccess } from './supplier.actions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class SuppliersEffects {
  constructor(private actions$: Actions,
    private supplierService: SupplierService,
    private store: Store<AppState>,
    private http: HttpClient) {
  }

  getSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSuppliers),
      withLatestFrom(this.store.select(getIdBuyer)),
      switchMap(([action, idBuyer]) => {
        const param = new HttpParams({
          fromObject: {
            pId: (action.supplierSearch.pId ? action.supplierSearch.pId.toString().trim() : ''),
            pSubId: (action.supplierSearch.pSubId ? action.supplierSearch.pSubId.toString().trim() : ''),
            pLabel: (action.supplierSearch.pLabel ? action.supplierSearch.pLabel.toString().trim() : ''),
            pOffSet: (action.supplierSearch.pOffSet ? action.supplierSearch.pOffSet.toString().trim() : ''),
            pNextRow: (action.supplierSearch.pNextRow ? action.supplierSearch.pNextRow.toString().trim() : ''),
            pIdBuyer: (idBuyer ? idBuyer.toString() : ''),
          }
        });
        return this.http.get(environment.apiUrl + 'supplier/SupplierCollection', { params: param }).pipe(
          map((suppliersModel: SupplierModel[]) => getSuppliersSuccess({ suppliersModel })),
          catchError(error => of(getSuppliersFailure))
        )
      })
    )
  );

  setSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSupplier),
      switchMap(action => {
        const param = new HttpParams({
          fromObject: {
            pId: (action.supplierSearch.pId ? action.supplierSearch.pId.toString().trim() : ''),
            pSubId: (action.supplierSearch.pSubId ? action.supplierSearch.pSubId.toString().trim() : ''),
            pYear: (action.supplierSearch.pYear ? action.supplierSearch.pYear.toString().trim() : ''),
          }
        });
        return this.http.get(environment.apiUrl + 'supplier/Purchased', { params: param }).pipe(
          map((supplierPurchased: SupplierPurchasedModel[]) => {
            const supplierModel = new SupplierModel();
            supplierModel.Id = action.supplierSearch.pId;
            supplierModel.SubId = action.supplierSearch.pSubId;
            supplierModel.Purchased = supplierPurchased
            // console.log('1', supplierPurchased)
            // console.log('1', supplierModel.Purchased)
            return setSupplierSuccess({ supplierModel })
          }
          ),
          catchError(error => of(getSuppliersFailure))
        )
      })
    )
  );

  getSupplierFirstAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSupplierFirstAgreement),
      switchMap(action => {
        const haCY$ = this.supplierService.HeaderAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: new Date().getFullYear() }).
          pipe(first(), shareReplay(1));
        const haYB$ = this.supplierService.HeaderAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: new Date().getFullYear() - 1 }).
          pipe(first(), shareReplay(1));
        const paCY$ = this.supplierService.PremiaAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: new Date().getFullYear() }).
          pipe(first(), shareReplay(1));
        const paYB$ = this.supplierService.PremiaAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: new Date().getFullYear() - 1 }).
          pipe(first(), shareReplay(1));

        return forkJoin([haCY$, haYB$, paCY$, paYB$]).pipe(
          map(response => {
            // console.log('getSupplierFirstAgreement', response);
            const cy = new Date().getFullYear();
            const yb = new Date().getFullYear() - 1;
            let t = [...response[0], ...response[1], ...response[2], ...response[3]];
            let sfam = [...new Set(t.map(item => item.TyLine))].map(tl => {
              return {
                TyLine: tl,
                Label: t.find(s => s.TyLine === tl).Label,
                Cy: cy,
                Yb: yb,
                hCY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.HEADER && s.Year === cy)?.Pc || null,
                hYB: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.HEADER && s.Year === yb)?.Pc || null,
                pCY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy)?.Pc || null,
                pYB: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === yb)?.Pc || null,
              } as SupplierFirstAgreementModel
            })
            return getSupplierFirstAgreementSuccess({ supplieFirstAgreementModel: sfam })

          })
        );
      })
    ));

  getSupplierSecondAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSupplierSecondAgreement),
      switchMap((action) => {
        const cy = new Date().getFullYear();
        const by = new Date().getFullYear() - 1;
        console.log(action.purchases)
        const pcCY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: cy }).
          pipe(first(), shareReplay(1));
        const pcBY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: by }).
          pipe(first(), shareReplay(1));
        const fxCY$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchases.filter(p => p.Year === cy), pYear: cy }).
          pipe(first(), shareReplay(1));
        const fxYB$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchases.filter(p => p.Year === by), pYear: by }).
          pipe(first(), shareReplay(1));

        return forkJoin([pcCY$, pcBY$, fxCY$, fxYB$]).pipe(
          map(response => {
            console.log(response[3])
            let t = [...response[0], ...response[1], ...response[2], ...response[3]];
            console.log(t)
            // const t1 = t.reduce((r, o) => (r[o.Year, o.TyLine] ? (r[o.Year, o.TyLine].Pc += o.Pc) : (r[o.Year, o.TyLine] = { ...o }), r), {})
            // console.log(t1)
            // let sfam1: SupplierFirstAgreementModel[] = []
            // Object.keys(t1).forEach(k => {
            //   const value: SupplierFirstAgreementModel = t1[k];

            //   sfam1.push({
            //     TyLine: value.TyLine,
            //     Cy: cy,
            //     Yb: by,
            //     //     pCY =
            //   } as SupplierFirstAgreementModel)
            // });
            // console.log('sfam1', sfam1);

            let sfam = [...new Set(t.map(item => item.TyLine))].map(tl => {
              console.log('qui', tl, t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === by)?.Pc)
              return {
                TyLine: tl,
                Label: t.find(s => s.TyLine === tl).Label,
                Cy: cy,
                Yb: by,
                pCY: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy).reduce((sum, sam) => sum + sam.Pc, 0) || null,
                pYB: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === by).reduce((sum, sam) => sum + sam.Pc, 0) || null
              } as SupplierFirstAgreementModel
            })

            console.log(sfam)
            return getSupplierSecondAgreementSuccess({ supplieSecondAgreementModel: sfam });
          })
        );
      })
    ));

  setSupplierListino$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSupplierListino),
      switchMap(action => {
        const param = new HttpParams({
          fromObject: {
            pId: (action.listSupplierSearch.pId ? action.listSupplierSearch.pId.toString().trim() : ''),
            pSubId: (action.listSupplierSearch.pSubId ? action.listSupplierSearch.pSubId.toString().trim() : ''),
            pYear: (action.listSupplierSearch.pYear ? action.listSupplierSearch.pYear.toString().trim() : ''),
          }
        });

        return this.http.get(environment.apiUrl + 'supplier/IndicePercentualeListinoLordoDettaglio', { params: param })
          .pipe(
            map((lsim: ListSupplierIndexDetailModel[]) => {
              return setSupplierListinoSuccess({ supplierListino: lsim })
            }
            ),
            catchError(() => of(setSupplierListinoFailure)
            ))
      })
    ));

}

