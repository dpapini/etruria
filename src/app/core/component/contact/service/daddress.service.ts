import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DAdressSearch } from '../model/daddressModel';
import { DAdressModel } from './../model/daddressModel';
@Injectable({
  providedIn: 'root'
})
export class DAddressService {

  constructor(private http: HttpClient) { }

  DAddressCollection(dts: DAdressSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dts.pId ? dts.pId?.toString().trim() : ''),
        pLabel: (dts.pLabel ? dts.pLabel.trim() : ''),
      }
    });

    return this.http.get<DAdressModel[]>(environment.apiUrl + 'dlabeladdress/DLabelAddressCollection', { params: param });
  }
}
