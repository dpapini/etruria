import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user.module';

export const getUserState = createFeatureSelector<UserState>('EtruriaUsers');

export const getUserList = createSelector(
   getUserState,
   (u) => u.EtruriaUsers.usersModel
);