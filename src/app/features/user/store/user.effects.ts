import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { UserModel, UserSearch, UserTipologiaRicerca } from 'src/app/core/component/user/model/userModel';
import { toastSuccess, toastFailure } from 'src/app/core/toaster/store/toaster.actsions';
import { environment } from '../../../../environments/environment';
import { addUser, addUserComplete, getUsersFailure, getUsers, getUsersSuccess } from './user.actions';

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
               tap(() => this.store.dispatch(toastSuccess({ title: null, message: `Salvataggio avvenuto correttamente` }))),
               map(() => {
                  const userSearch: UserSearch = { pTyRicerca: UserTipologiaRicerca.RICERCA }
                  return getUsers({ userSearch });
               }),
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
}
