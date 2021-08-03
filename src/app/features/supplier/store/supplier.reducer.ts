import { Action, createReducer, on } from '@ngrx/store';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierFirstAgreementModel } from 'src/app/core/component/supplier/model/supplierAgreement';
import { clearDataSupplier, clearSupplier, setSupplierFirstAgreementSuccess, getSupplierSecondAgreementSuccess, getSuppliersSuccess, setSupplierListinoSuccess, setSupplierSuccess } from './supplier.actions';

export interface SuppliersState {
  supplierListino: ListSupplierIndexDetailModel[],
  supplierSecondAgreementModel: SupplierFirstAgreementModel[],
  supplierFirstAgreementModel: SupplierFirstAgreementModel[],
  suppliersModel: SupplierModel[];
  supplierActive: SupplierModel;
  // filter: string;
}

const initializeSupplierState: SuppliersState = {
  supplierListino: [],
  supplierSecondAgreementModel: [],
  supplierFirstAgreementModel: [],
  suppliersModel: [],
  supplierActive: null,
  // filter: '',
}

const suppliersReducerInternal = createReducer(
  initializeSupplierState,

  on(getSuppliersSuccess, (state, action) => {
    return { ...state, suppliersModel: [...action.suppliersModel] };
  }),
  on(setSupplierSuccess, (state, action) => {
    return { ...state, suppliersModel: [...state.suppliersModel], supplierActive: action.supplierModel };
  }),
  on(clearSupplier, (state, action) => {
    return { ...state, suppliersModel: [], supplierFirstAgreementModel: [], supplierSecondAgreementModel: [], supplierActive: null, supplierListino: [] };
  }),
  on(clearDataSupplier, (state, action) => {
    return { ...state, supplierFirstAgreementModel: [], supplierSecondAgreementModel: [], supplierActive: null, supplierListino: [] };
  }),
  on(setSupplierFirstAgreementSuccess, (state, action) => {
    return { ...state, supplierFirstAgreementModel: [...action.supplieFirstAgreementModel] };
  }),
  on(getSupplierSecondAgreementSuccess, (state, action) => {
    return { ...state, supplierSecondAgreementModel: [...action.supplieSecondAgreementModel] };
  }),
  on(setSupplierListinoSuccess, (state, action) => {
    return { ...state, supplierListino: [...action.supplierListino] };
  }),
);

export function SuppliersReducer(state: SuppliersState | undefined, action: Action) {
  return suppliersReducerInternal(state, action);
}

