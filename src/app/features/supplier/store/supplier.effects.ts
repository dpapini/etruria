import { getCurrentYear, getBeforeYear } from './supplier.selectors';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, first, map, mapTo, shareReplay, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { getIdBuyer, getIdUser } from 'src/app/core/component/store/login/login.selectors';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierInvoiceModel } from 'src/app/core/component/supplier/model/supplierInvoice';
import { SupplierPurchasedModel } from 'src/app/core/component/supplier/model/supplierPurchased';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { environment } from '../../../../environments/environment';
import { RequestModel, RequestSearchModel, TYPEREQUEST } from './../../../core/component/request/request';
import { SupplierFirstAgreementModel, TipologiaAgreement } from './../../../core/component/supplier/model/supplierAgreement';
import { toastFailure, toastSuccess, toastSuccessReload } from '../../../core/component/store/toaster/toaster.actions';
import { addEtruriaRequest, addEtruriaRequestFailure, addEtruriaRequestSuccess, getSupplierFirstAgreement, setSupplierFirstAgreementSuccess, getEtruriaRequest, getEtruriaRequestFailure, getEtruriaRequestSuccess, getSuppliers, getSupplierSecondAgreement, getSupplierSecondAgreementSuccess, getSuppliersFailure, getSuppliersSuccess, setSupplier, setSupplierListino, setSupplierListinoFailure, setSupplierListinoSuccess, setSupplierSuccess, addSupplierCrossLine, addSupplierCrossLineSuccess, getSupplierCrossLine, setSupplierCrossLineSuccess, deleteSupplierCrossLineSuccess, deleteSupplierCrossLine } from './supplier.actions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class SuppliersEffects {
  private keepLive$ = new Subject();

  constructor(private actions$: Actions,
    private supplierService: SupplierService,
    private store: Store<AppState>,
    private http: HttpClient) {
    this.keepLive$.next(true);
    setTimeout(() => {
      this.keepLive$.next(false);
    }, 60000);
  }

  getSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSuppliers),
      withLatestFrom(this.store.select(getIdBuyer)),
      switchMap(([action, idBuyer]) => {
        const ss = { ...action.supplierSearch };
        ss.pIdBuyer = idBuyer;

        return this.supplierService.SupplierCollection(ss).pipe(
          map((suppliersModel: SupplierModel[]) => getSuppliersSuccess({ suppliersModel })),
          catchError(error => of(getSuppliersFailure())))
      })
    )
  );

  setSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSupplier),
      withLatestFrom(
        this.store.select(getCurrentYear),
        this.store.select(getBeforeYear)
      ),
      switchMap(([action, cy, by]) => {
        const param = new HttpParams({
          fromObject: {
            pId: (action.supplierSearch.pId ? action.supplierSearch.pId.toString().trim() : ''),
            pSubId: (action.supplierSearch.pSubId ? action.supplierSearch.pSubId.toString().trim() : ''),
            pYear: (action.supplierSearch.pYear ? action.supplierSearch.pYear.toString().trim() : ''),
          }
        });
        const purchasedeByline$ = this.http.get(environment.apiUrl + 'supplier/Purchased', { params: param }).pipe(first(),
          map((supplierPurchased: SupplierPurchasedModel[]) => supplierPurchased),
          catchError(error => of(error)));

        //recupero il fatturato a pari data per l'anno precedente
        const dt = new Date();
        const dtStart = new Date(by, 0, 1);
        const dtEnd = new Date(by, dt.getMonth(), dt.getDate());
        const param1 = new HttpParams({
          fromObject: {
            pIdSupplier: (action.supplierSearch.pId ? action.supplierSearch.pId.toString().trim() : ''),
            pSubIdSupplier: (action.supplierSearch.pSubId ? action.supplierSearch.pSubId.toString().trim() : ''),
            pDtStart: dtStart.toISOString(),
            pDtEnd: dtEnd.toISOString()
          }
        });
        const purchasedAtDate$ = this.http.get(environment.apiUrl + 'supplier/PurchasedAtDate', { params: param1 }).pipe(first(),
          map((supplierInvoice: SupplierInvoiceModel) => supplierInvoice),
          catchError(error => of(error)))

        return forkJoin([purchasedeByline$, purchasedAtDate$]).pipe(
          map(([purchasedeByline, purchasedAtDate]:
            [SupplierPurchasedModel[], SupplierInvoiceModel]) => {
            // console.log('supplierModel', purchasedeByline, purchasedAtDate)
            const supplierModel: SupplierModel = {
              Id: action.supplierSearch.pId,
              SubId: action.supplierSearch.pSubId,
              Purchased: purchasedeByline,
              PurchasedAtDate: purchasedAtDate,
            }
            return setSupplierSuccess({ supplierModel })
          }
          ));
      })
    )
  );

  getSupplierFirstAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSupplierFirstAgreement),
      withLatestFrom(
        this.store.select(getCurrentYear),
        this.store.select(getBeforeYear)
      ),
      switchMap(([action, cy, by]) => {
        const haCY$ = this.supplierService.HeaderAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: cy }).
          pipe(first(), shareReplay(1));
        const haYB$ = this.supplierService.HeaderAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: by }).
          pipe(first(), shareReplay(1));
        const paCY$ = this.supplierService.PremiaAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: cy }).
          pipe(first(), shareReplay(1));
        const paYB$ = this.supplierService.PremiaAgreementCollection({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: by }).
          pipe(first(), shareReplay(1));
        const sCross$ = this.supplierService.GetSupplierCrossLine({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: action.supplierSearch.pYear })

        return forkJoin([haCY$, haYB$, paCY$, paYB$, sCross$]).pipe(
          switchMap(response => {
            // console.log('getSupplierFirstAgreement', response);
            let t = [...response[0], ...response[1], ...response[2], ...response[3]];
            const supplierCrossModel = [...response[4]];
            // console.log(t);
            let sfam = [...new Set(t.map(item => item.TyLine))].map(tl => {
              return {
                TyLine: tl,
                Label: t.find(s => s.TyLine === tl).Label,
                Cy: cy,
                By: by,
                hCY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.HEADER && s.Year === cy)?.Pc || null,
                hBY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.HEADER && s.Year === by)?.Pc || supplierCrossModel.find(c => c.TyDiscountLine === tl && c.Year === by)?.PcDiscountHeader || null, //devo recpuerare evntuale cross
                pCY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy)?.Pc || null,
                pBY: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === by)?.Pc || supplierCrossModel.find(c => c.TyDiscountLine === tl && c.Year === by)?.PcDiscountPremia || null, //devo recpuerare evntuale cross
                stateDeal: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy)?.DsStateDeal || null,
                typeDeal: t.find(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy)?.DsTypeDeal || null,
              } as SupplierFirstAgreementModel
            })
            return [setSupplierFirstAgreementSuccess({ supplieFirstAgreementModel: sfam }), setSupplierCrossLineSuccess({ supplierCrossModel })]
            //supplierCrossModel.filter(c=>c.TyDiscountLine===tl && c.Year===by)?
          })
        );
      })
    ));

  getSupplierSecondAgreement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSupplierSecondAgreement),
      withLatestFrom(
        this.store.select(getCurrentYear),
        this.store.select(getBeforeYear)
      ),
      switchMap(([action, cy, by]) => {
        const pcCY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: cy }).
          pipe(first(), shareReplay(1));
        const pcBY$ = this.supplierService.PremiaAgreementCollectionPcSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pYear: by }).
          pipe(first(), shareReplay(1));
        const fxCY$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchasesCY?.filter(p => p.Year === cy), pYear: cy }).
          pipe(first(), shareReplay(1));
        const fxYB$ = this.supplierService.PremiaAgreementCollectionFixSecondLivel({ pId: action.supplierSearch.pId, pSubId: action.supplierSearch.pSubId, pPurchases: action.purchasesBY?.filter(p => p.Year === by), pYear: by }).
          pipe(first(), shareReplay(1));

        return forkJoin([pcCY$, pcBY$, fxCY$, fxYB$]).pipe(
          map(response => {
            let t = [...response[0], ...response[1], ...response[2], ...response[3]];

            let sfam = [...new Set(t.map(item => item.TyLine))].map(tl => {
              return {
                TyLine: tl,
                Label: t.find(s => s.TyLine === tl).Label,
                Cy: cy,
                By: by,
                pCY: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === cy).reduce((sum, sam) => sum + sam.Pc, 0) || null,
                pBY: t.filter(s => s.TyLine === tl && s.TipologiaDiscount === TipologiaAgreement.PREMIA && s.Year === by).reduce((sum, sam) => sum + sam.Pc, 0) || null
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
          tap(() => {
            const etruriaRequestSearch: RequestSearchModel = { pTyRequest: TYPEREQUEST.BENCHMARKXLSX }
            this.keepLive$.next(true);
            this.store.dispatch(getEtruriaRequest({ etruriaRequestSearch }));
          }),
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

  addSupplierCrossLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSupplierCrossLine),
      // withLatestFrom(this.store.pipe(select(getIdUser))),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'supplier/UpdateSupplierCrossLine', action.scm, httpOptions).pipe(
          switchMap(() => [
            toastSuccessReload({ title: null, message: "Salvataggio avvenuto correttamente." }),
            addSupplierCrossLineSuccess()
          ]
          ),
          catchError(error => {
            return of(toastFailure(
              {
                title: null,
                message: `Il salvataggio ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}<br>${error.error?.StackTrace}]</b>`
              }))
          })
        )
      })
    )
  );

  deleteSupplierCrossLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSupplierCrossLine),
      // withLatestFrom(this.store.pipe(select(getIdUser))),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'supplier/DeleteSupplierCrossLine', action.scm, httpOptions).pipe(
          switchMap(() => [
            toastSuccessReload({ title: null, message: "Cancellazione avvenuta correttamente." }),
            deleteSupplierCrossLineSuccess()
          ]
          ),
          catchError(error => {
            return of(toastFailure(
              {
                title: null,
                message: `La cancellazione ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}<br>${error.error?.StackTrace}]</b>`
              }))
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

        return timer(0, 5000).pipe(mapTo(a), takeUntil(this.keepLive$));
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
            map((rc: RequestModel[]) => {
              console.log(rc, rc.length)
              if (rc && rc.length === 0) this.keepLive$.next(false);
              return getEtruriaRequestSuccess()
            }),
            catchError(() => of(getEtruriaRequestFailure())
            )
          )
      }
      )
    )
  );

}

