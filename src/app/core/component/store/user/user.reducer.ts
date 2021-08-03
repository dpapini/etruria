import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { clearUsers, getUsersSuccess } from './user.actions';


export interface UsersState {
  usersModel: UserModel[];
}

export const initializeUsersState: UsersState = {
  usersModel: null,
};

const userReducerInternal = createReducer(
  initializeUsersState,

  on(getUsersSuccess, (state, action) => {
    return { ...state, usersModel: [...action.usersModel] };
  }),
  on(clearUsers, (state) => {
    return { ...state, usersModel: [] };
  }),
);

export function UsersReducer(state: UsersState | undefined, action: Action) {
  return userReducerInternal(state, action);
}

