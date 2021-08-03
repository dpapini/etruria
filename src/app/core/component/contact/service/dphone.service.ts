import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DPhoneModel, DPhoneSearch } from '../model/dphoneModel';

@Injectable({
  providedIn: 'root'
})
export class DPhoneService {

  constructor(private http: HttpClient) { }

  DPhoneCollection(dts: DPhoneSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dts.pId ? dts.pId?.toString().trim() : ''),
        pLabel: (dts.pLabel ? dts.pLabel.trim() : ''),
      }
    });

    return this.http.get<DPhoneModel[]>(environment.apiUrl + 'dphone/DPhoneCollection', { params: param });
  }
}
