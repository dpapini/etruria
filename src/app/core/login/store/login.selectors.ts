import { UserModel } from './../../component/user/model/userModel';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { state } from '@angular/animations';

export const getLoginState = (state: AppState) => state.TeknoLoginState;

export const getUserModel = (state: AppState) => state.TeknoLoginState?.userModel;

export const getIsLogged = createSelector(
   getLoginState,
   state => state.isLogged
);

export const getUserId = createSelector(
   getUserModel,
   (profile: UserModel) => profile?.Userid
);

export const getIdUser = createSelector(
   getUserModel,
   (profile: UserModel) => profile?.Id
);

export const getShowError = createSelector(
   getLoginState,
   state => state.showError,
);

export const getMenu = createSelector(
   getLoginState,
   state => state.menuModel,
)

