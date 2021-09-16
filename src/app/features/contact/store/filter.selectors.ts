import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filterContactState } from '../contact.module';


export const getFilterContactState = createFeatureSelector<filterContactState>('filterContact');

export const getFilterContactParam = createSelector(
  getFilterContactState,
  (f: filterContactState) => f.search.contactSearch
);

export const getFilterContactResult = createSelector(
  getFilterContactState,
  (f: filterContactState) => f.search.contactSearch
);
