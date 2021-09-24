import { SupplierCrossModel, SupplierCrossSearch } from './../model/supplierCross';
import { SupplierDiscountLine } from './../model/supplierAgreement';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetectionPriceModel, DetectionPriceSearch } from '../model/detectionPrice';
import { LinePriceModel } from '../model/linePrice';
import { SupplierSearch } from '../model/supplier';
import { SupplierAgreementModel, SupplierAgreementSearch } from '../model/supplierAgreement';
import { environment } from './../../../../../environments/environment';
import { SupplierBenchModel, SupplierBenchSearch } from '../model/supplierBench';

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

  SupplierCollection(ss: SupplierSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (ss.pId ? ss.pId.toString().trim() : ''),
        pSubId: (ss.pSubId ? ss.pSubId.toString().trim() : ''),
        pLabel: (ss.pLabel ? ss.pLabel.toString().trim() : ''),
        pOffSet: (ss.pOffSet ? ss.pOffSet.toString().trim() : ''),
        pNextRow: (ss.pNextRow ? ss.pNextRow.toString().trim() : ''),
        pIdBuyer: (ss.pIdBuyer ? ss.pIdBuyer.toString() : ''),
        pFilter: ss.pFilter ? ss.pFilter.toString().trim() : '',
      }
    });
    return this.http.get<SupplierModel[]>(environment.apiUrl + 'supplier/SupplierCollection', { params: param });
  }

  DetectionPriceBySupplier(dps: DetectionPriceSearch) {
    return this.http.get<DetectionPriceModel[]>(environment.apiUrl + 'supplier/DetectionPriceBySupplier', { params: this.getParamDetectionPrice(dps) });
  }

  DetectionPriceBylinea(dps: DetectionPriceSearch) {
    return this.http.get<DetectionPriceModel>(environment.apiUrl + 'supplier/DetectionPriceBylinea', { params: this.getParamDetectionPrice(dps) });
  }

  DetectionPriceByTotal(dps: DetectionPriceSearch) {
    return this.http.get<DetectionPriceModel>(environment.apiUrl + 'supplier/DetectionPriceTotal', { params: this.getParamDetectionPrice(dps) });
  }

  LinePriceCollection() {
    return this.http.get<LinePriceModel[]>(environment.apiUrl + 'supplier/LinePriceCollection');
  }

  HeaderAgreementCollection(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    return this.http.get<SupplierAgreementModel[]>(environment.apiUrl + 'supplier/PercentualeTestata', { params: this.getParamSupplierAgreement(as) });
  }

  PremiaAgreementCollection(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    return this.http.get<SupplierAgreementModel[]>(environment.apiUrl + 'supplier/PercentualePremia', { params: this.getParamSupplierAgreement(as) });
  }

  PremiaAgreementCollectionPcSecondLivel(as: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    return this.http.get<SupplierAgreementModel[]>(environment.apiUrl + 'supplier/PercentualePremiaSecondLivel', { params: this.getParamSupplierAgreement(as) });
  }

  PremiaAgreementCollectionFixSecondLivel(sas: SupplierAgreementSearch): Observable<SupplierAgreementModel[]> {
    return this.http.post<SupplierAgreementModel[]>(environment.apiUrl + 'supplier/FissoPremiaSecondLivel', sas, httpOptions);
  }

  GetSupplierCrossLine(scs: SupplierCrossSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: scs.pId ? scs.pId.toString().trim() : '',
        pSubId: scs.pSubId ? scs.pSubId.toString().trim() : '',
        pYear: scs.pYear ? scs.pYear.toString().trim() : '',
        pTyDiscountLine: scs.pTyDiscountLine ? scs.pTyDiscountLine.toString().trim() : '',
      }
    });
    return this.http.get<SupplierCrossModel[]>(environment.apiUrl + 'supplier/GetSupplierCrossLine', { params: param });
  }

  BenchMarkTotale(sbs: SupplierBenchSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: sbs.pId ? sbs.pId.toString().trim() : '',
        pSubId: sbs.pSubId ? sbs.pSubId.toString().trim() : '',
        pIdBuyer: sbs.pIdBuyer ? sbs.pIdBuyer.toString().trim() : ''
      }
    });
    return this.http.get<SupplierBenchModel>(environment.apiUrl + 'supplier/BenchMarkTotale', { params: param });
  }

  GetLineBySupplierYear(as: SupplierAgreementSearch) {
    return this.http.get<SupplierDiscountLine[]>(environment.apiUrl + 'supplier/GetLineBySupplierYear', { params: this.getParamSupplierAgreement(as) });
  }

  private getParamSupplierAgreement(as: SupplierAgreementSearch) {
    return new HttpParams({
      fromObject: {
        pId: (as.pId ? as.pId.toString().trim() : ''),
        pSubId: (as.pSubId ? as.pSubId.toString().trim() : ''),
        pYear: (as.pYear ? as.pYear.toString().trim() : ''),
      }
    });
  }

  private getParamDetectionPrice(dps: DetectionPriceSearch) {
    return new HttpParams({
      fromObject: {
        pIdSupplier: (dps.pIdSupplier ? dps.pIdSupplier.toString().trim() : ''),
        pSubIdSupplier: (dps.pSubIdSupplier ? dps.pSubIdSupplier.toString().trim() : ''),
        pTyRicerca: (dps.pTyRicerca !== null ? dps.pTyRicerca.toString().trim() : ''),
        pIdLine: (dps.pIdLine ? dps.pIdLine.toString().trim() : ''),
      }
    });
  }

}

