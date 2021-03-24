import { createAction, props } from '@ngrx/store';
import { UserModel, UserSearch } from 'src/app/core/component/user/model/userModel';

export enum UserActionTypes {
   GET_USERS = '[Login] Get Users',
   GET_USERS_SUCCESS = '[Login] Get Users Success',
   GET_USERS_FAILURE = '[Login] Get Users Failure',
   ADD_USER = '[Login] Add User',
   ADD_USER_COMPLETE = '[Login] Add User Complete',
   ADD_USER_FAILURE = '[Login] Add User Failure',

}

export const getUsers = createAction(UserActionTypes.GET_USERS,
   props<{ userSearch: UserSearch }>()
);

export const getUserSuccess = createAction(UserActionTypes.GET_USERS_SUCCESS,
   props<{ userModels: UserModel[] }>()
);
export const getUserFailure = createAction(UserActionTypes.GET_USERS_FAILURE
);

export const addUser = createAction(UserActionTypes.ADD_USER,
   props<{ userModel: UserModel }>()
);
export const addUserComplete = createAction(UserActionTypes.ADD_USER_COMPLETE);
export const addUserFailure = createAction(UserActionTypes.ADD_USER_FAILURE);