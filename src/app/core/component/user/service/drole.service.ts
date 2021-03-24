import { EtruriaHandleError } from './../../../services/etruria-handle-error';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { environment } from '../../../../../environments/environment';
import { DRoleModel, DRoleSearch } from '../model/droleModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DRoleService {

  constructor(private http: HttpClient,
    private store: Store<AppState>) { }

  DRoleCollection(drs: DRoleSearch): Observable<DRoleModel[]> {
    const param = new HttpParams(
      {
        fromObject: {
          pId: drs && drs.pId ? drs.pId.toString() : '',
          pLabel: drs && drs.pLabel ? drs.pLabel.toString() : '',
        }
      }
    );
    return this.http.get(environment.apiUrl + 'drole/DRoleCollection', { params: param }).pipe(
      map((drm: DRoleModel[]) => drm),
      catchError(error => EtruriaHandleError)
    )

  }
}
