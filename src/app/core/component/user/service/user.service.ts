import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { environment } from './../../../../../environments/environment';
import { UserModel, UserSearch } from './../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private store: Store<AppState>) { }

  UserCollection(us: UserSearch): Observable<UserModel[]> | Observable<unknown> {
    const param = new HttpParams(
      {
        fromObject: {
          pId: us && us.pId ? us.pId.toString() : '',
          pTyRicerca: us && us.pTyRicerca ? us.pTyRicerca.toString() : '',
        }
      }
    );
    return this.http.get(environment.apiUrl + 'user/UserCollection', { params: param }).pipe(
      map((um: UserModel[]) => um),
      catchError(error => {
        console.log(error)
        return of();
      })
    )

  }
}
