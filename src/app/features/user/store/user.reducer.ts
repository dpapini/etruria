import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { getUserSuccess } from './user.actions';


export interface UsersState {
   userModels: UserModel[];
}

export const initializeAuthState: UsersState = {
   userModels: null,
};

const userReducerInternal = createReducer(
   initializeAuthState,

   on(getUserSuccess, (state, action) => {
      return { ...state, userModels: [...action.userModels] };
   }),
);

export function UsersReducer(state: UsersState | undefined, action: Action) {
   return userReducerInternal(state, action);
}

