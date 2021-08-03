import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { logout } from 'src/app/core/component/store/login/login.actions';
import { toastFailure, toastSuccess } from 'src/app/core/component/store/toaster/toaster.actsions';
import { UserModel, UserSearch, UserTipologiaRicerca } from 'src/app/core/component/user/model/userModel';
import { environment } from 'src/environments/environment';
import { addUser, changePassword, editUser, editUserSuccess, getUsers, getUsersFailure, getUsersSuccess } from './user.actions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions,
    private store: Store<AppState>,
    private http: HttpClient) {
  }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(action => {
        const param = new HttpParams(
          {
            fromObject: {
              pId: action.userSearch && action.userSearch.pId ? action.userSearch.pId.toString() : '',
              pTyRicerca: action.userSearch && action.userSearch.pTyRicerca ? action.userSearch.pTyRicerca.toString() : '',
            }
          }
        );
        return this.http.get(environment.apiUrl + 'user/UserCollection', { params: param }).pipe(
          map((usersModel: UserModel[]) => getUsersSuccess({ usersModel })),
          catchError(error => of(getUsersFailure))
        )
      })
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'user/AddUser', action, httpOptions).pipe(
          switchMap(() => {
            const userSearch: UserSearch = { pTyRicerca: UserTipologiaRicerca.RICERCA }
            return [
              toastSuccess({ title: null, message: `Salvataggio avvenuto correttamente` }),
              getUsers({ userSearch })
            ]
          }
          ),
          catchError((error) =>
            of(toastFailure(
              {
                title: null,
                message: `Il salvataggio ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}]</b>`
              }
            )
            )
          )
        )
      })
    )
  );

  editPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'user/EditPassword', action, httpOptions).pipe(
          switchMap(() =>
            [toastSuccess({ title: null, message: `Salvataggio avvenuto correttamente` }), logout()]
          ),
          catchError((error) =>
            of(toastFailure(
              {
                title: null,
                message: `Il salvataggio ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}]</b>`
              }
            )
            )
          )
        )
      })
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'user/EditUser', action.userModel, httpOptions).pipe(
          switchMap(() => [editUserSuccess(), toastSuccess({ title: null, message: `Salvataggio avvenuto correttamente` })]),
          catchError((error) => of(toastFailure(
            {
              title: null,
              message: `Il salvataggio ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error.ExceptionMessage}]</b>`
            }
          ))
          )
        )
      })
    )
  );
}
