import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DRoleModel, DRoleSearch } from '../model/droleModel';

@Injectable({
  providedIn: 'root'
})
export class DRoleService {

  constructor(private http: HttpClient) { }

  DRoleCollection(drs: DRoleSearch): Observable<DRoleModel[] | any> {
    const param = new HttpParams(
      {
        fromObject: {
          pId: drs && drs.pId ? drs.pId.toString() : '',
          pLabel: drs && drs.pLabel ? drs.pLabel.toString() : '',
        }
      }
    );
    return this.http.get<DRoleModel[]>(environment.apiUrl + 'drole/DRoleCollection', { params: param });
  }
}
