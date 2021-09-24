import { SupplierCrossModel } from './../../../core/component/supplier/model/supplierCross';
import { Action, createReducer, on } from '@ngrx/store';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierFirstAgreementModel } from 'src/app/core/component/supplier/model/supplierAgreement';
import { clearDataSupplier, clearSupplier, setSupplierFirstAgreementSuccess, getSupplierSecondAgreementSuccess, getSuppliersSuccess, setSupplierListinoSuccess, setSupplierSuccess, setSupplierCrossLineSuccess } from './supplier.actions';

export interface SuppliersState {
  supplierListino: ListSupplierIndexDetailModel[],
  supplierSecondAgreementModel: SupplierFirstAgreementModel[],
  supplierFirstAgreementModel: SupplierFirstAgreementModel[],
  supplierCrossLine: SupplierCrossModel[],
  suppliersModel: SupplierModel[];
  supplierActive: SupplierModel;
  currentYear: number,
  beforeYear: number,
}

const initializeSupplierState: SuppliersState = {
  supplierListino: [],
  supplierSecondAgreementModel: [],
  supplierFirstAgreementModel: [],
  supplierCrossLine: [],
  suppliersModel: [],
  supplierActive: null,
  currentYear: new Date().getFullYear(),
  beforeYear: new Date().getFullYear() - 1,
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
    return {
      ...state, suppliersModel: [], supplierFirstAgreementModel: [], supplierSecondAgreementModel: []
      , supplierActive: null, supplierListino: [], supplierCrossLine: []
    };
  }),
  on(clearDataSupplier, (state, action) => {
    return {
      ...state, supplierFirstAgreementModel: [], supplierSecondAgreementModel: []
      , supplierActive: null, supplierListino: [], supplierCrossLine: []
    };
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
  on(setSupplierCrossLineSuccess, (state, action) => {
    return { ...state, supplierCrossLine: [...action.supplierCrossModel] };
  }),
);

export function SuppliersReducer(state: SuppliersState | undefined, action: Action) {
  return suppliersReducerInternal(state, action);
}

