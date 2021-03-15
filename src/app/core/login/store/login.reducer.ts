import { MenuModel } from './../../component/sidebar/model/menuModel';
import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { loginFailed, loginSuccess, logoutComplete } from './login.actions';


export interface LoginState {
   userModel: UserModel;
   isLogged: boolean;
   showError: boolean;
   menuModel: MenuModel;
}

export const initializeAuthState: LoginState = {
   userModel: null,
   isLogged: false,
   showError: false,
   menuModel: null,
};

const loginReducerInternal = createReducer(
   initializeAuthState,

   on(loginSuccess, (state, { userModel, isLogged, showError, menuModel }) => {
      return { ...state, userModel, isLogged, showError, menuModel };
   }),
   on(loginFailed, (state, { }) => {
      return { ...state, userModel: null, isLogged: false, showError: true, menuModel: null, error: null };
   }),
   on(logoutComplete, (state, { }) => {
      return { undefined, userModel: null, isLogged: false, showError: false, menuModel: null, error: null };
   })
);

export function LoginReducer(state: LoginState | undefined, action: Action) {
   return loginReducerInternal(state, action);
}

