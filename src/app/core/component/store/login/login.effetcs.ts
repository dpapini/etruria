import { MenuModel } from './../../sidebar/model/menuModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { clearSupplier } from 'src/app/features/supplier/store/supplier.actions';
import { environment } from 'src/environments/environment';
import { addPhoto, addPhotoSuccess, changePassword, deletePhoto, deletePhotoSuccess, login, loginFailed, loginRequest, loginSuccess, logout, logoutComplete } from './login.actions';
import { getIdUser } from './login.selectors';
import { toastFailure, toastSuccess } from 'src/app/core/component/store/toaster/toaster.actions';
import { clearUsers } from 'src/app/core/component/store/user/user.actions';
import { ChatService } from '../../chat/service/chat.service';

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
    private chatService: ChatService,
    private router: Router) {
  }

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      tap(() => this.router.navigate(['/Login']))
    ), { dispatch: false });

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action => {
        return this.http.post(environment.apiUrl + 'login/Login', action, httpOptions).pipe(
          catchError(err => of(loginFailed({ userModel: null, isLogged: false, showError: true, menuModel: null, error: err }))
          )
        );
      }),
      switchMap((userModel: UserModel) => {
        return this.http.get<MenuModel>(environment.apiUrl + 'login/GetMenu?IdUser=' + userModel.Id + '&AllMenu=false').pipe(
          map(menuModel => loginSuccess({ userModel, isLogged: true, showError: false, menuModel })),
          catchError(err => of(loginFailed({ userModel: null, isLogged: false, showError: true, menuModel: null, error: err })))
        )
      }),
    )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    map(() => {
      if (this.router.url === '/Login') {
        this.router.navigate(['/Home']);
      }
    })
  ), { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      withLatestFrom(this.store.pipe(select(getIdUser))),
      exhaustMap(([action, id]) => {
        return this.http.get(environment.apiUrl + 'login/LogOut?id=' + id)
          .pipe(
            tap(() => this.chatService.disconnect()),
            catchError((error) => {
              return of(toastFailure(
                {
                  title: null,
                  message: `Il logout ha generato un errore.<br>
                     Se l'errore persiste contattare l'amministatore.<br>
                     <b>[${error.message}<br>${error.error?.ExceptionMessage}<br>${error.error?.StackTrace}]</b>`
                }))
            })
          )
      }),
      switchMap(() => [logoutComplete(), clearSupplier(), clearUsers()]
      ))
  )

  logoutCopmlete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutComplete),
      tap(() => this.router.navigate(['Login']))
    ), { dispatch: false }
  )

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

  addPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPhoto),
      switchMap(action => {
        const u = { Id: action.id, Photo: action.photo }
        return this.http.post(environment.apiUrl + 'user/AddPhoto', u, httpOptions).pipe(
          switchMap(() => [addPhotoSuccess({ photo: action.photo }), toastSuccess({ title: null, message: `Immagine del profilo aggiunta corretamente` })]),
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

  deletePhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePhoto),
      switchMap(action => {
        return this.http.post(environment.apiUrl + 'user/DeletePhoto', action.id, httpOptions).pipe(
          switchMap(() => [deletePhotoSuccess(), toastSuccess({ title: null, message: `Immagine del profilo eliminata corretamente` })]),
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
