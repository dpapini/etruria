import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { DMailModel, DMailSearch } from './../model/dmailModel';

@Injectable({
  providedIn: 'root'
})
export class DmailService {

  constructor(private http: HttpClient) { }

  DMailCollection(dms: DMailSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dms.pId ? dms.pId?.toString() : ''),
        pTesto: (dms.pLabel ? dms.pLabel?.trim() : ''),
      }
    });

    return this.http.get<DMailModel[]>(environment.apiUrl + 'dmail/DMailCollection', { params: param });
  }
}
