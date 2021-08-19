import { environment } from 'src/environments/environment';
import { CustomerSearch, CustomerModel } from './../model/customer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  CustomerCollection(cs: CustomerSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: cs.pId ? cs.pId.toString() : '',
        pIdParent: cs.pIdParent ? cs.pIdParent.toString() : '',
        pCdFiscale: cs.pCdFiscale ? cs.pCdFiscale.trim() : '',
        pPartitaIva: cs.pPartitaIva ? cs.pPartitaIva.trim() : '',
        pLabel: cs.pLabel ? cs.pLabel.trim() : '',
        pTyCustomer: cs.pTyCustomer ? cs.pTyCustomer.toString().trim() : '',
        pTySearch: cs.pTySearch ? cs.pTySearch.toString().trim() : '',
        OffSet: cs.OffSet ? cs.OffSet.toString().trim() : '',
        NextRow: cs.NextRow ? cs.NextRow.toString().trim() : '',
      }
    });
    return this.http.get<CustomerModel[]>(environment.apiUrl + 'customer/CustomerCollection', { params: param });
  }
}
