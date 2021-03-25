import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierState } from '../supplier.module';

export const getSupplierState = createFeatureSelector<SupplierState>('EtruriaSuppliers');

export const getSupplierList = createSelector(
   getSupplierState,
   (s) => s.EtruriaSuppliers.suppliersModel
);

export const getSupplier = (idSupplier: number, subIdSupplier: number) => createSelector(
   getSupplierState,
   (s) => {
      return s.EtruriaSuppliers.suppliersModel?.filter(s => s.Id === idSupplier && s.SubId === subIdSupplier)[0] || null
   }
)