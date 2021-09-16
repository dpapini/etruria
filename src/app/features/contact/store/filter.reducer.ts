import { Action, createReducer, on } from '@ngrx/store';
import { ContactModel, ContactSearch } from 'src/app/core/component/contact/model/contactModel';
import { filterContact, filterContactSuccess, filterContactFailed } from './filter.actions';

export interface FilterContactState {
  contactSearch: ContactSearch;
  contactResult: ContactModel[];
}

export const initializeArticoloState: FilterContactState = {
  contactSearch: null,
  contactResult: null,
};

const searchReducerInternal = createReducer(
  initializeArticoloState,
  on(filterContact, (state, action) => ({ ...state, contactSearch: action.cs })),
  on(filterContactSuccess, (state, action) => ({ ...state, contactResult: action.response })),
  on(filterContactFailed, (state, action) => ({ ...state, contactResult: null })),
);

export function FilterContactReducer(state: FilterContactState | undefined, action: Action) {
  return searchReducerInternal(state, action);
}


