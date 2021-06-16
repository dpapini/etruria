import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserModel } from './../../component/user/model/userModel';

export const getLoginState = (state: AppState) => state.EtruriaLoginState;

export const getUserModel = (state: AppState) => state.EtruriaLoginState?.userModel;

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

export const getIdBuyer = createSelector(
   getUserModel,
   (profile: UserModel) => profile?.IdBuyer || null
);

export const getShowError = createSelector(
   getLoginState,
   state => state.showError,
);

export const getMenu = createSelector(
   getLoginState,
   state => state.menuModel,
)

