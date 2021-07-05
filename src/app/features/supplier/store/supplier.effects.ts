import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, first, map, mapTo, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierPurchasedModel } from 'src/app/core/component/supplier/model/supplierPurchased';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { environment } from '../../../../environments/environment';
import { RequestModel, RequestSearchModel } from './../../../core/component/request/request';
import { SupplierFirstAgreementModel, TipologiaAgreement } from './../../../core/component/supplier/model/supplierAgreement';
import { getIdBuyer, getIdUser } from './../../../core/login/store/login.selectors';
import { toastFailure, toastSuccess } from './../../../core/toaster/store/toaster.actsions';
import { addEtruriaRequest, addEtruriaRequestFailure, addEtruriaRequestSuccess, getSupplierFirstAgreement, getSupplierFirstAgreementSuccess, getEtruriaRequest, getEtruriaRequestFailure, getEtruriaRequestSuccess, getSuppliers, getSupplierSecondAgreement, getSupplierSecondAgreementSuccess, getSuppliersFailure, getSuppliersSuccess, setSupplier, setSupplierListino, setSupplierListinoFailure, setSupplierListinoSuccess, setSupplierSuccess } from './supplier.actions';

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
          catchError(error => of(getSuppliersFailure()))
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
            return setSupplierSuccess({ supplierModel })
          }
          ),
          catchError(error => of(getSuppliersFailure()))
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
      ofType(getSupplierSecondAgreement)
      , switchMap((action) => {
        console.log(action)
        const cy = new Date().getFullYear();
        const by = new Date().getFullYear() - 1;
        const pcCY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: cy }).
          pipe(first(), shareReplay(1));
        const pcBY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: by }).
          pipe(first(), shareReplay(1));
        const fxCY$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchasesCY.filter(p => p.Year === cy), pYear: cy }).
          pipe(first(), shareReplay(1));
        const fxYB$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchasesBY.filter(p => p.Year === by), pYear: by }).
          pipe(first(), shareReplay(1));

        return forkJoin([pcCY$, pcBY$, fxCY$, fxYB$]).pipe(
          map(response => {
            // console.log('2', response)
            let t = [...response[0], ...response[1], ...response[2], ...response[3]];

            let sfam = [...new Set(t.map(item => item.TyLine))].map(tl => {
              return {
                TyLine: tl,
                Label: t.find(s => s.TyLine === tl).Label,
                Cy: cy,
                Yb: by,
                pCY: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy).reduce((sum, sam) => sum + sam.Pc, 0) || null,
                pYB: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === by).reduce((sum, sam) => sum + sam.Pc, 0) || null
              } as SupplierFirstAgreementModel
            })
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
            map((lsim: ListSupplierIndexDetailModel[]) => setSupplierListinoSuccess({ supplierListino: lsim })),
            catchError(() => of(setSupplierListinoFailure())
            ))
      })
    )
  );

  addEtruriaRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEtruriaRequest),
      withLatestFrom(this.store.pipe(select(getIdUser))),
      switchMap(([action, idUser]) => {
        const er: RequestModel = { ...action.etruriaRequest };
        er.IdUser = idUser;
        return this.http.post(environment.apiUrl + 'request/AddRequest', er, httpOptions).pipe(
          map(() => {
            this.store.dispatch(toastSuccess({ title: null, message: "Richiesta inserita correttamente." }))
            return addEtruriaRequestSuccess()
          }
          ),
          catchError((error) => {
            this.store.dispatch(toastFailure(
              {
                title: null,
                message: `Il salvataggio ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}<br>${error.error?.StackTrace}]</b>`
              }))
            return of(addEtruriaRequestFailure())
          })
        )
      })
    )
  );

  getEtruriaRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(getEtruriaRequest),
      withLatestFrom(
        this.store.pipe(select(getIdUser))
      ),
      switchMap(([action, idUser]) => {
        const etruriaRequestSearch: RequestSearchModel = { ...action.etruriaRequestSearch };
        etruriaRequestSearch.pIdUser = idUser;

        const a = { ...action, etruriaRequestSearch: etruriaRequestSearch }

        return timer(0, 10000000).pipe(mapTo(a));
      }
      ),
      switchMap(action => {
        console.log(action);
        const param = new HttpParams({
          fromObject: {
            pIdUser: action.etruriaRequestSearch.pIdUser.toString().trim(),
            pTyRequest: action.etruriaRequestSearch.pTyRequest.toString()
          }
        });
        return this.http.get(environment.apiUrl + 'request/GetRequestCompleted', { params: param })
          .pipe(
            map((rc: RequestModel[]) => getEtruriaRequestSuccess()),
            catchError(() => of(getEtruriaRequestFailure())
            )
          )
      }
      )
    )
  );

}

