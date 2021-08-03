import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DContactModel, DContactSearch } from '../model/dcontactModel';

@Injectable({
  providedIn: 'root'
})
export class DcontactService {

  constructor(private http: HttpClient) { }

  DContactCollection(dcs: DContactSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dcs.pId ? dcs.pId?.toString().trim() : ''),
        pLabel: (dcs.pLabel ? dcs.pLabel.trim() : ''),
      }
    });

    return this.http.get<DContactModel[]>(environment.apiUrl + 'dcontact/DContactCollection', { params: param });
  }
}
