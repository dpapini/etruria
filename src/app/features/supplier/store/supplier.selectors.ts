import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierPurchasedModel } from 'src/app/core/component/supplier/model/supplierPurchased';
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

export const getPurchasedYear = createSelector(
  getSupplierState,
  (s) => {
    // return s.EtruriaSuppliers.supplierActive.Purchased.map(p => p.Year);
    return Object.values<SupplierPurchasedModel>(s.EtruriaSuppliers.supplierActive?.Purchased.reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {})).map(p => p.Year)
  }
)

export const getPurchasedValue = createSelector(
  getSupplierState,
  (s) => {
    return Object.values<SupplierPurchasedModel>(s.EtruriaSuppliers.supplierActive?.Purchased.reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {})).map(p => p.Purchased)
  }
)

export const getPurchasedValueByYearLine = (year: number, line: string) => createSelector(
  getSupplierState,
  (s) => {
    const t = (s.EtruriaSuppliers.supplierActive?.Purchased.filter(p => p.Year === year && p.TyLine === line)?.reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {}))
    if (t)
      return Object.values<SupplierPurchasedModel>(t).map(p => p.Purchased)[0]
    else return null;
  }
)

export const getPurchasedValueByYear = (year: number) => createSelector(
  getSupplierState,
  (s) => {

    const t = (s.EtruriaSuppliers?.supplierActive?.Purchased.filter(p => p.Year === year)?.reduce((r, o) =>
      (r[o.Year, o.TyLine] ? (r[o.Year, o.TyLine].Purchased += o.Purchased) : (r[o.Year, o.TyLine] = { ...o }), r), {}))
    if (t)
      return Object.values<SupplierPurchasedModel>(t);
    else return null;
  }
)

export const getFirstAgreement = createSelector(
  getSupplierState,
  (s) => {
    return s ? s.EtruriaSuppliers.supplierFirstAgreementModel : null;
  }
)
export const getFirstAgreementByLine = (tyLine: string) => createSelector(
  getSupplierState,
  (s) => {
    return s ? s.EtruriaSuppliers.supplierFirstAgreementModel.filter(s => s.TyLine === tyLine) : null;
  }
)

export const getSecondAgreement = createSelector(
  getSupplierState,
  (s) => {
    return s ? [...s.EtruriaSuppliers.supplierSecondAgreementModel].sort((a, b) => { return a.TyLine < b.TyLine ? -1 : 1; }) : null;
  }
)

export const getListinoSupplier = createSelector(
  getSupplierState,
  (s) => {
    return s ? s.EtruriaSuppliers.supplierListino : null;
  }
)

export const getListinoSupplierByLine = (tyLine: string) => createSelector(
  getSupplierState,
  (s) => {
    return s ? s.EtruriaSuppliers.supplierListino.filter(l => l.TyLine === tyLine) : null;
  }
)
