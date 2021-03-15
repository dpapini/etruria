import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { loginRequest } from '../login/store/login.actions';
import { getIsLogged, getUserModel } from './../login/store/login.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  isLogged$: Observable<boolean> = this.store.pipe(select(getIsLogged));
  userModel$: Observable<UserModel> = this.store.pipe(select(getUserModel));

  constructor(private router: Router, private store: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return this.store.pipe(
      select(getIsLogged),
      map(isLogged => {
        if (isLogged) { return true; }
        else {
          this.store.dispatch(loginRequest());
        }
      })
    );
  }

}
