import { createAction, props } from '@ngrx/store';
import { UserModel, UserSearch } from 'src/app/core/component/user/model/userModel';

export enum UserActionTypes {
  GET_USERS = '[User] Get Users',
  GET_USERS_SUCCESS = '[User] Get Users Success',
  GET_USERS_FAILURE = '[User] Get Users Failure',
  ADD_USER = '[User] Add User',
  ADD_USER_SUCCESS = '[User] Add User Success',
  ADD_USER_FAILURE = '[User] Add User Failure',
  EDIT_USER = '[User] Edit User',
  EDIT_USER_SUCCESS = '[User] Edit User Success',
  CLEAR = "[User] clear",
  CHANGE_PASSWORD = '[User] User Change Password',
}

export const getUsers = createAction(UserActionTypes.GET_USERS,
  props<{ userSearch: UserSearch }>()
);

export const getUsersSuccess = createAction(UserActionTypes.GET_USERS_SUCCESS,
  props<{ usersModel: UserModel[] }>()
);
export const getUsersFailure = createAction(UserActionTypes.GET_USERS_FAILURE
);

export const addUser = createAction(UserActionTypes.ADD_USER,
  props<{ userModel: UserModel }>()
);
export const addUserSuccess = createAction(UserActionTypes.ADD_USER_SUCCESS);

export const editUser = createAction(UserActionTypes.EDIT_USER,
  props<{ userModel: UserModel }>()
);
export const editUserSuccess = createAction(UserActionTypes.EDIT_USER_SUCCESS);

export const clearUsers = createAction(UserActionTypes.CLEAR);

export const changePassword = createAction(UserActionTypes.CHANGE_PASSWORD,
  props<{ userModel: UserModel }>()
);
