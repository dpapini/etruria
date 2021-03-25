import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierSearch, SupplierModel } from '../model/supplier';
import { EtruriaHandleError } from 'src/app/core/services/etruria-handle-error';
import { DetectionPriceModel, DetectionPriceSearch } from '../model/detectionPrice';
import { ListSupplierSearch, ListSupplierModel, ListSupplierIndexModel } from '../model/listSupplier';

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
         }
      });

      return this.http.get(environment.apiUrl + 'supplier/DectionPriceBySupplier', { params: param })
         .pipe(
            map((dpm: DetectionPriceModel[]) => dpm),
            catchError(error => EtruriaHandleError)
         );
   }

   ListSupplierIndex(lss: ListSupplierSearch) {
      if (!lss.pId && !lss.pSubId) return;
      const param = new HttpParams({
         fromObject: {
            pId: (lss.pId ? lss.pId.toString().trim() : ''),
            pSubId: (lss.pSubId ? lss.pSubId.toString().trim() : ''),
         }
      });

      return this.http.get(environment.apiUrl + 'supplier/IndicePercentualeListinoLordo', { params: param })
         .pipe(
            map((lsim: ListSupplierIndexModel) => lsim),
            catchError(error => EtruriaHandleError)
         );
   }
}
