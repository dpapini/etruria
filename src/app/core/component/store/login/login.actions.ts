import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { MenuModel } from '../../sidebar/model/menuModel';
import { LoginModel } from '../../../login/model/loginModel';

export enum AuthActionTypes {
  LOGIN = '[Login] Login',
  LOGIN_REQUEST = '[Login] Login Request',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_FAILURE = '[Login] Login Failure',
  LOGOUT = '[Login] Logout',
  LOGOUT_COMPLETE = '[Login] Logout Complete',

  ADD_PHOTO = '[User] Add Photo',
  ADD_PHOTO_SUCCESS = '[User] Add Photo Success',
  ADD_PHOTO_FAILURE = '[User] Add Photo Failure',
  DELETE_PHOTO = '[User] Delete Photo',
  DELETE_PHOTO_SUCCESS = '[User] Delete Photo Success',
  DELETE_PHOTO_FAILURE = '[User] Delete Photo Failure',
  CHANGE_PASSWORD = '[User] User Change Password',
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

export const addPhoto = createAction(AuthActionTypes.ADD_PHOTO,
  props<{ id: number, photo: string }>()
);
export const addPhotoSuccess = createAction(AuthActionTypes.ADD_PHOTO_SUCCESS, props<{ photo: string }>());

export const deletePhoto = createAction(AuthActionTypes.DELETE_PHOTO,
  props<{ id: number }>()
);
export const deletePhotoSuccess = createAction(AuthActionTypes.DELETE_PHOTO_SUCCESS);

export const changePassword = createAction(AuthActionTypes.CHANGE_PASSWORD,
  props<{ userModel: UserModel }>()
);

