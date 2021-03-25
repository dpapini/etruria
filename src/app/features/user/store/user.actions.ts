import { createAction, props } from '@ngrx/store';
import { UserModel, UserSearch } from 'src/app/core/component/user/model/userModel';

export enum UserActionTypes {
   GET_USERS = '[User] Get Users',
   GET_USERS_SUCCESS = '[User] Get Users Success',
   GET_USERS_FAILURE = '[User] Get Users Failure',
   ADD_USER = '[User] Add User',
   ADD_USER_COMPLETE = '[User] Add User Complete',
   ADD_USER_FAILURE = '[User] Add User Failure',

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
export const addUserComplete = createAction(UserActionTypes.ADD_USER_COMPLETE);
export const addUserFailure = createAction(UserActionTypes.ADD_USER_FAILURE);