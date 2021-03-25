import { Action, createReducer, on } from '@ngrx/store';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { getSuppliersSuccess } from './supplier.actions';

export interface SuppliersState {
   suppliersModel: SupplierModel[];
}

const initializeSupplierState: SuppliersState = {
   suppliersModel: null,
}

const suppliersReducerInternal = createReducer(
   initializeSupplierState,

   on(getSuppliersSuccess, (state, action) => {
      return { ...state, suppliersModel: [...action.suppliersModel] };
   }),
);

export function SuppliersReducer(state: SuppliersState | undefined, action: Action) {
   return suppliersReducerInternal(state, action);
}

