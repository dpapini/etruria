import { createAction, props } from '@ngrx/store';
import { ContactSearch, ContactModel } from 'src/app/core/component/contact/model/contactModel';

export enum ContattoActionTypes {
  FILTER = '[contact] Search',
  FILTER_SUCCESS = '[contact] Search Success',
  FILTER_FAILURE = '[contact] Search Failure',
}

export const filterContact = createAction(ContattoActionTypes.FILTER,
  props<{ cs: ContactSearch }>()
);
export const filterContactSuccess = createAction(
  ContattoActionTypes.FILTER_SUCCESS,
  props<{ response: ContactModel[] }>(),
);
export const filterContactFailed = createAction(
  ContattoActionTypes.FILTER_FAILURE,
);

