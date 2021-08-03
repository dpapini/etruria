import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomDataAdapter } from './core/component/custom-data-adapter';
import { Loginffects } from './core/component/store/login/login.effetcs';
import { LoginReducer, LoginState } from './core/component/store/login/login.reducer';
import { ToastEffects } from './core/component/store/toaster/toaster.effects';
import { ToastReducer, ToastState } from './core/component/store/toaster/toaster.reducer';
import { UsersEffects } from './core/component/store/user/user.effects';
import { UsersReducer, UsersState } from './core/component/store/user/user.reducer';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderInterceptor } from './core/loader/loader.interceptor';
import { LoaderService } from './core/loader/loader.service';

export interface AppState {
  EtruriaLoginState: LoginState;
  EtruriaToastState: ToastState,
  EtruriaUserState: UsersState,
}
export const reducers: ActionReducerMap<AppState> = {
  EtruriaLoginState: LoginReducer,
  EtruriaToastState: ToastReducer,
  EtruriaUserState: UsersReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['EtruriaLoginState', 'EtruriaSuppliers'], rehydrate: true, removeOnUndefined: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot({
      disableTimeOut: false, progressBar: true, progressAnimation: 'decreasing', timeOut: 7000, enableHtml: true,
      preventDuplicates: true, extendedTimeOut: 1000, positionClass: 'toast-bottom-full-width'
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([Loginffects, ToastEffects, UsersEffects]),

  ],
  providers: [
    LoaderService,
    { provide: NgbDateAdapter, useClass: CustomDataAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) { library.addIconPacks(far, fas); }
}
