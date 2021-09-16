import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.module';


export const getUserState = (state: AppState) => state.EtruriaUserState;

export const getUserList = createSelector(
  getUserState,
  (u) => u.usersModel
);

export const getUserById = (id: number) => createSelector(
  getUserState,
  (u) => u.usersModel?.filter(u => u.Id === id)[0] || null
)

export const getPhotoById = (id: number) => createSelector(
  getUserById(id),
  (u) => u.Photo || null
);


export const getIdBuyerByUserid = (userId: string) => createSelector(
  getUserList,
  (ul) => ul?.filter(u => u.Userid === userId)[0].IdBuyer || null
)
