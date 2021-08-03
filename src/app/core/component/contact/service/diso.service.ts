import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DIsoModel, DISoSearch } from '../model/disoModel';

@Injectable({
  providedIn: 'root'
})
export class DIsoService {
  constructor(private http: HttpClient) { }

  DIsoCollection(dcs: DISoSearch) {
    const param = new HttpParams({
      fromObject: {
        pId: (dcs.pId ? dcs.pId?.toString() : ''),
        pLabel: (dcs.pLabel ? dcs.pLabel?.trim() : ''),
      }
    });

    return this.http.get<DIsoModel[]>(environment.apiUrl + 'diso/DIsoCollection', { params: param });
  }
}
