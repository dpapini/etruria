import { SupplierCrossSearch } from './../../../core/component/supplier/model/supplierCross';
import { RequestModel, RequestSearchModel } from './../../../core/component/request/request';
import { SupplierPurchasedModel } from 'src/app/core/component/supplier/model/supplierPurchased';
import { createAction, props } from '@ngrx/store';
import { ListSupplierIndexDetailModel } from 'src/app/core/component/supplier/model/listSupplier';
import { SupplierModel, SupplierSearch } from 'src/app/core/component/supplier/model/supplier';
import { ListSupplierSearch } from './../../../core/component/supplier/model/listSupplier';
import { SupplierFirstAgreementModel } from './../../../core/component/supplier/model/supplierAgreement';
import { SupplierCrossModel } from 'src/app/core/component/supplier/model/supplierCross';

export enum SupplierActionTypes {
  GET_SUPPLIERS = '[Supplier] Get Suppliers',
  GET_SUPPLIERS_SUCCESS = '[Supplier] Get Suppliers Success',
  GET_SUPPLIERS_FAILURE = '[Supplier] Get Suppliers Failure',
  SET_SUPPLIER_ACTIVE = '[Supplier] Set supplier Active',
  SET_SUPPLIERS_ACTIVE_SUCCESS = '[Supplier] Set Suppliers Active Success',
  SET_SUPPLIERS_ACTIVE_FAILURE = '[Supplier] Set Suppliers Active Failure',
  CLEAR_SUPPLIER = '[Supplier] Clear',
  CLEAR_DATA_SUPPLIER = '[Supplier] Clear data',
  GET_FIRST_AGREEMENT = '[Supplier] Get First Agreement Suppliers',
  GET_FIRST_AGREEMENT_SUCCESS = '[Supplier] Set First Agreement Suppliers Success',
  GET_SECOND_AGREEMENT = '[Supplier] Get Second Agreement Suppliers',
  GET_SECOND_AGREEMENT_SUCCESS = '[Supplier] Set Second Agreement Suppliers Success',
  GET_SECOND_AGREEMENT_FAILURE = '[Supplier] Set Second Agreement Suppliers Failure',
  SET_LISTINO = '[Supplier] Get Listino',
  SET_LISTINO_SUCCESS = '[Supplier] Get Listino Success',
  SET_LISTINO_FAILURE = '[Supplier] Get Listino Failure',
  ADD_REQUEST_ETRURIA = '[Supplier] Add Request BenchMarck ',
  ADD_REQUEST_ETRURIA_SUCCESS = '[Supplier] Add Request BenchMarck Success',
  ADD_REQUEST_ETRURIA_FAILURE = '[Supplier] Add Request BenchMarck Failure',
  ADD_SUPPLIER_CROSS_LINE = '[Supplier] Add SupplierCrossLine  ',
  ADD_SUPPLIER_CROSS_LINE_SUCCESS = '[Supplier] Add SupplierCrossLine Success',
  ADD_SUPPLIER_CROSS_LINE_FAILURE = '[Supplier] Add SupplierCrossLine Failure',
  DELETE_SUPPLIER_CROSS_LINE = '[Supplier] Delete SupplierCrossLine  ',
  DELETE_SUPPLIER_CROSS_LINE_SUCCESS = '[Supplier] Delete SupplierCrossLine Success',
  DELETE_SUPPLIER_CROSS_LINE_FAILURE = '[Supplier] Delete SupplierCrossLine Failure',
  GET_SUPPLIER_CROSS_LINE = '[Supplier] Get SupplierCrossLine  ',
  GET_SUPPLIER_CROSS_LINE_SUCCESS = '[Supplier] Get SupplierCrossLine Success',
  GET_SUPPLIER_CROSS_LINE_FAILURE = '[Supplier] Get SupplierCrossLine Failure',
  GET_REQUEST_ETRURIA = '[Supplier] Get Request BenchMarck ',
  GET_REQUEST_ETRURIA_SUCCESS = '[Supplier] Get Request BenchMarck Success',
  GET_REQUEST_ETRURIA_FAILURE = '[Supplier] Get Request BenchMarck Failure',
}

export const getSuppliers = createAction(SupplierActionTypes.GET_SUPPLIERS,
  props<{ supplierSearch: SupplierSearch }>()
);

export const getSuppliersSuccess = createAction(SupplierActionTypes.GET_SUPPLIERS_SUCCESS,
  props<{ suppliersModel: SupplierModel[] }>()
);
export const getSuppliersFailure = createAction(SupplierActionTypes.GET_SUPPLIERS_FAILURE
);

export const setSupplier = createAction(SupplierActionTypes.SET_SUPPLIER_ACTIVE,
  props<{ supplierSearch: SupplierSearch }>()
);

export const setSupplierSuccess = createAction(SupplierActionTypes.SET_SUPPLIERS_ACTIVE_SUCCESS,
  props<{ supplierModel: SupplierModel }>()
);
export const setSupplierFailure = createAction(SupplierActionTypes.SET_SUPPLIERS_ACTIVE_FAILURE);

export const clearSupplier = createAction(SupplierActionTypes.CLEAR_SUPPLIER);
export const clearDataSupplier = createAction(SupplierActionTypes.CLEAR_DATA_SUPPLIER);

export const getSupplierFirstAgreement = createAction(SupplierActionTypes.GET_FIRST_AGREEMENT,
  props<{ supplierSearch: SupplierSearch }>()
);
export const setSupplierFirstAgreementSuccess = createAction(SupplierActionTypes.GET_FIRST_AGREEMENT_SUCCESS,
  props<{ supplieFirstAgreementModel: SupplierFirstAgreementModel[] }>()
);
export const setSupplierListino = createAction(SupplierActionTypes.SET_LISTINO,
  props<{ listSupplierSearch: ListSupplierSearch }>()
);
export const setSupplierListinoSuccess = createAction(SupplierActionTypes.SET_LISTINO_SUCCESS,
  props<{ supplierListino: ListSupplierIndexDetailModel[] }>()
);
export const setSupplierListinoFailure = createAction(SupplierActionTypes.SET_LISTINO_FAILURE);

export const getSupplierSecondAgreement = createAction(SupplierActionTypes.GET_SECOND_AGREEMENT,
  props<{ supplierSearch: SupplierSearch, purchasesCY: SupplierPurchasedModel[], purchasesBY: SupplierPurchasedModel[] }>()
);
export const getSupplierSecondAgreementSuccess = createAction(SupplierActionTypes.GET_SECOND_AGREEMENT_SUCCESS,
  props<{ supplieSecondAgreementModel: SupplierFirstAgreementModel[] }>()
);
export const getSupplierSecondAgreementFailure = createAction(SupplierActionTypes.GET_SECOND_AGREEMENT_FAILURE);

export const addEtruriaRequest = createAction(SupplierActionTypes.ADD_REQUEST_ETRURIA,
  props<{ etruriaRequest: RequestModel }>()
);
export const addEtruriaRequestSuccess = createAction(SupplierActionTypes.ADD_REQUEST_ETRURIA_SUCCESS);
export const addEtruriaRequestFailure = createAction(SupplierActionTypes.ADD_REQUEST_ETRURIA_FAILURE);

export const getEtruriaRequest = createAction(SupplierActionTypes.GET_REQUEST_ETRURIA,
  props<{ etruriaRequestSearch: RequestSearchModel }>()
);
export const getEtruriaRequestSuccess = createAction(SupplierActionTypes.GET_REQUEST_ETRURIA_SUCCESS);
export const getEtruriaRequestFailure = createAction(SupplierActionTypes.GET_REQUEST_ETRURIA_FAILURE);

export const addSupplierCrossLine = createAction(SupplierActionTypes.ADD_SUPPLIER_CROSS_LINE,
  props<{ scm: SupplierCrossModel }>()
);
export const addSupplierCrossLineSuccess = createAction(SupplierActionTypes.ADD_SUPPLIER_CROSS_LINE_SUCCESS);
export const addSupplierCrossLineFailure = createAction(SupplierActionTypes.ADD_SUPPLIER_CROSS_LINE_FAILURE);

export const deleteSupplierCrossLine = createAction(SupplierActionTypes.DELETE_SUPPLIER_CROSS_LINE,
  props<{ scm: SupplierCrossModel }>()
);
export const deleteSupplierCrossLineSuccess = createAction(SupplierActionTypes.DELETE_SUPPLIER_CROSS_LINE_SUCCESS);
export const deleteSupplierCrossLineFailure = createAction(SupplierActionTypes.DELETE_SUPPLIER_CROSS_LINE_FAILURE);

export const getSupplierCrossLine = createAction(SupplierActionTypes.GET_SUPPLIER_CROSS_LINE,
  props<{ supplierCrossSearch: SupplierCrossSearch }>()
);
export const setSupplierCrossLineSuccess = createAction(SupplierActionTypes.GET_SUPPLIER_CROSS_LINE_SUCCESS,
  props<{ supplierCrossModel: SupplierCrossModel[] }>()
);
