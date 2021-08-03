import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DLabelAddressModel, DLabelAddressSearch } from '../model/dlabelAddressModel';

@Injectable({
  providedIn: 'root'
})
export class DLabelAddressService {

  constructor(private http: HttpClient) { }

  DLabelAddressCollection(dts: DLabelAddressSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dts.pId ? dts.pId?.toString().trim() : ''),
        pLabel: (dts.pLabel ? dts.pLabel.trim() : ''),
      }
    });

    return this.http.get<DLabelAddressModel[]>(environment.apiUrl + 'dlabeladdress/DLabelAddressCollection', { params: param })
  }
}
