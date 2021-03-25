import { createAction, props } from '@ngrx/store';
import { SupplierSearch, SupplierModel } from 'src/app/core/component/supplier/model/supplier';

export enum SupplierActionTypes {
   GET_SUPPLIERS = '[Supplier] Get Suppliers',
   GET_SUPPLIERS_SUCCESS = '[Supplier] Get Suppliers Success',
   GET_SUPPLIERS_FAILURE = '[Supplier] Get Suppliers Failure',
}

export const getSuppliers = createAction(SupplierActionTypes.GET_SUPPLIERS,
   props<{ supplierSearch: SupplierSearch }>()
);

export const getSuppliersSuccess = createAction(SupplierActionTypes.GET_SUPPLIERS_SUCCESS,
   props<{ suppliersModel: SupplierModel[] }>()
);
export const getSuppliersFailure = createAction(SupplierActionTypes.GET_SUPPLIERS_FAILURE
);
