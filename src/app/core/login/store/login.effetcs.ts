import { MenuModel } from './../../component/sidebar/model/menuModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { getIdUser } from 'src/app/core/login/store/login.selectors';
import { environment } from '../../../../environments/environment';
import { TeknoHandleError } from './../../services/tekno-handle-error';
import { login, loginFailed, loginRequest, loginSuccess, logout, logoutComplete } from './login.actions';

const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
   })
};

@Injectable()
export class Loginffects {
   constructor(private actions$: Actions,
      private store: Store<AppState>,
      private http: HttpClient,
      private router: Router) {
   }

   loginRequest$ = createEffect(() =>
      this.actions$.pipe(
         ofType(loginRequest),
         map(() => this.router.navigate(['/Login']))
      ), { dispatch: false });

   login$ = createEffect(() =>
      this.actions$.pipe(
         ofType(login),
         switchMap(action => {
            return this.http.post(environment.apiUrl + 'login/Login', action, httpOptions).pipe(
               map((userModel: UserModel) => userModel),
               catchError(err => of(loginFailed({ userModel: null, isLogged: false, showError: true, menuModel: null, error: err }))
               )
            );
         }),
         switchMap((userModel: UserModel) => {
            return this.http.get(environment.apiUrl + 'login/GetMenu?IdUser=' + userModel.Id + '&AllMenu=false').pipe(
               map((menuModel: MenuModel) => loginSuccess({ userModel, isLogged: true, showError: false, menuModel })),
               catchError(err => of(loginFailed({ userModel: null, isLogged: false, showError: true, menuModel: null, error: err })))
            )
         }),
      )
   );

   loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccess),
      map(() => {
         console.log(this.router.url)
         if (this.router.url === '/Login') {
            this.router.navigate(['/Home']);
         }
      })
   ), { dispatch: false });

   loginFailed = createEffect(() => this.actions$.pipe(
      ofType(loginFailed),
      map(action => action.error),
      tap(error => new TeknoHandleError().set(error))
   ), { dispatch: false });

   logout$ = createEffect(() =>
      this.actions$.pipe(
         ofType(logout),
         withLatestFrom(this.store.pipe(select(getIdUser))),
         switchMap(([action, id]) => {
            return this.http.get(environment.apiUrl + 'login/LogOut?id=' + id)
               .pipe(
                  switchMap(() => [logoutComplete()]),
                  tap(() => this.router.navigate(['Login'])),
                  catchError(err => of(loginFailed({ userModel: null, isLogged: false, showError: true, menuModel: null, error: err })))
               )
         })
      ))
}
