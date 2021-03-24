import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { MenuModel } from '../../component/sidebar/model/menuModel';
import { LoginModel } from '../model/loginModel';

export enum AuthActionTypes {
   LOGIN = '[Login] Login',
   LOGIN_REQUEST = '[Login] Login Request',
   LOGIN_SUCCESS = '[Login] Login Success',
   LOGIN_FAILURE = '[Login] Login Failure',
   LOGOUT = '[Login] Logout',
   LOGOUT_COMPLETE = '[Login] Logout Complete',
}

export const loginRequest = createAction(AuthActionTypes.LOGIN_REQUEST);

export const login = createAction(AuthActionTypes.LOGIN,
   props<{ loginRequest: LoginModel }>()
);

export const loginSuccess = createAction(
   AuthActionTypes.LOGIN_SUCCESS,
   props<{ userModel: UserModel | undefined, isLogged: boolean, showError: boolean, menuModel: MenuModel }>(),
);

export const loginFailed = createAction(
   AuthActionTypes.LOGIN_FAILURE,
   props<{ userModel: UserModel | undefined, isLogged: boolean, showError: boolean, menuModel: MenuModel, error: any }>(),
);

export const logout = createAction(AuthActionTypes.LOGOUT);

export const logoutComplete = createAction(AuthActionTypes.LOGOUT_COMPLETE);
