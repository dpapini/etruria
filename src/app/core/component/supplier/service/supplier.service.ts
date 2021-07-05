import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetectionPriceModel, DetectionPriceSearch } from '../model/detectionPrice';
import { LinePriceModel } from '../model/linePrice';
import { SupplierAgreementModel, SupplierAgreementSearch } from '../model/supplierAgreement';
import { environment } from './../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  DetectionPriceBySupplier(dps: DetectionPriceSearch) {
    const param = new HttpParams({
      fromObject: {
        pIdSupplier: (dps.pIdSupplier ? dps.pIdSupplier.toString().trim() : ''),
        pSubIdSupplier: (dps.pSubIdSupplier ? dps.pSubIdSupplier.toString().trim() : ''),
        pTyRicerca: (dps.pTyRicerca ? dps.pTyRicerca.toString().trim() : ''),
        pIdLine: (dps.pIdLine ? dps.pIdLine.toString().trim() : ''),
      }
    });

    return this.http.get(environment.apiUrl + 'supplier/DetectionPriceBySupplier', { params: param })
      .pipe(
        map((dpm: DetectionPriceModel[]) => dpm),
        catchError(error => of(error))
      );
  }

  DetectionPriceBylinea(dps: DetectionPriceSearch) {
    const param = new HttpParams({
      fromObject: {
        pIdSupplier: (dps.pIdSupplier ? dps.pIdSupplier.toString().trim() : ''),
        pSubIdSupplier: (dps.pSubIdSupplier ? dps.pSubIdSupplier.toString().trim() : ''),
        pTyRicerca: (dps.pTyRicerca !== null ? dps.pTyRicerca.toString().trim() : ''),
        pIdLine: (dps.pIdLine ? dps.pIdLine.toString().trim() : ''),
      }
    });

    return this.http.get(environment.apiUrl + 'supplier/DetectionPriceBylinea', { params: param })
      .pipe(
        map((dpm: DetectionPriceModel) => dpm),
        catchError(error => of(error))
      );
  }

  DetectionPriceByTotal(dps: DetectionPriceSearch) {
    const param = new HttpParams({
      fromObject: {
        pIdSupplier: (dps.pIdSupplier ? dps.pIdSupplier.toString().trim() : ''),
        pSubIdSupplier: (dps.pSubIdSupplier ? dps.pSubIdSupplier.toString().trim() : ''),
        pTyRicerca: (dps.pTyRicerca !== null ? dps.pTyRicerca.toString().trim() : ''),
        pIdLine: (dps.pIdLine ? dps.pIdLine.toString().trim() : ''),
      }
    });

    return this.http.get(environment.apiUrl + 'supplier/DetectionPriceTotal', { params: param })
      .pipe(
        map((dpm: DetectionPriceModel) => dpm),
        catchError(error => of(error))
      );
  }

  LinePriceCollection() {
    return this.http.get(environment.apiUrl + 'supplier/LinePriceCollection')
      .pipe(
        map((lp: LinePriceModel[]) => lp),
        catchError(error => of(error))
      );
  }

  HeaderAgreementCollection(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    const param = new HttpParams({
      fromObject: {
        pId: (as.pId ? as.pId.toString().trim() : ''),
        pSubId: (as.pSubId ? as.pSubId.toString().trim() : ''),
        pYear: (as.pYear ? as.pYear.toString().trim() : ''),
      }
    });
    return this.http.get(environment.apiUrl + 'supplier/PercentualeTestata', { params: param }).pipe(
      map((supplierAgreementModel: SupplierAgreementModel[]) => supplierAgreementModel),
      catchError(error => of(error))
    )
  }

  PremiaAgreementCollection(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    const param = new HttpParams({
      fromObject: {
        pId: (as.pId ? as.pId.toString().trim() : ''),
        pSubId: (as.pSubId ? as.pSubId.toString().trim() : ''),
        pYear: (as.pYear ? as.pYear.toString().trim() : ''),
      }
    });
    return this.http.get(environment.apiUrl + 'supplier/PercentualePremia', { params: param }).pipe(
      map((supplierAgreementModel: SupplierAgreementModel[]) => supplierAgreementModel),
      catchError(error => of(error))
    )
  }

  PremiaAgreementCollectionPcSecondLivel(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    const param = new HttpParams({
      fromObject: {
        pId: (as.pId ? as.pId.toString().trim() : ''),
        pSubId: (as.pSubId ? as.pSubId.toString().trim() : ''),
        pYear: (as.pYear ? as.pYear.toString().trim() : ''),
      }
    });
    return this.http.get(environment.apiUrl + 'supplier/PercentualePremiaSecondLivel', { params: param }).pipe(
      map((supplierAgreementModel: SupplierAgreementModel[]) => supplierAgreementModel),
      catchError(error => of(error))
    )
  }

  PremiaAgreementCollectionFixSecondLivel(sas: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    return this.http.post(environment.apiUrl + 'supplier/FissoPremiaSecondLivel', sas, httpOptions).pipe(
      map((supplierAgreementModel: SupplierAgreementModel[]) => supplierAgreementModel),
      catchError(error => of(error))
    )
  }
}

