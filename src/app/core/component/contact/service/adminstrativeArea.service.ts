import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AdministrativeAreaSearch } from '../model/adminstrativeAreaModel';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeAreaService {

  constructor(private http: HttpClient) { }

  AdminstrativeAreaCollection(cs: AdministrativeAreaSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (cs.pId ? cs.pId?.toString().trim() : ''),
        pLabel: (cs.pLabel ? cs.pLabel.toString().trim() : ''),
      }
    });

    return this.http.get(environment.apiUrl + 'administrativearea/AdministrativeAreaCollection', { params: param });
  }
}
