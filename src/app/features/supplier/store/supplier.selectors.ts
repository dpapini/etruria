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

export const getPurchasedYearByLine = (tyLine: string) => createSelector(
  getSupplierState,
  (s) => {
    // return s.EtruriaSuppliers.supplierActive.Purchased.map(p => p.Year);
    return Object.values<SupplierPurchasedModel>(s.EtruriaSuppliers.supplierActive?.Purchased.filter(p => p.TyLine === tyLine).reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {})).map(p => p.Year)
  }
)

export const getPurchasedValueByLine = (tyLine: string) => createSelector(
  getSupplierState,
  (s) => {
    return Object.values<SupplierPurchasedModel>(s.EtruriaSuppliers.supplierActive?.Purchased.filter(p => p.TyLine === tyLine).reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {})).map(p => p.Purchased)
  }
)

export const getPurchasedValueAtDate = createSelector(
  getSupplierState,
  (s, y) => {
    const r = [];
    return s.EtruriaSuppliers.supplierActive?.PurchasedAtDate || null
  }
)

export const getListLine = createSelector(
  getSupplierState,
  (s) => {
    return [...new Set(s.EtruriaSuppliers.supplierFirstAgreementModel.map(item => item.TyLine))].map(tyLine => {
      return {
        TyLine: tyLine,
        Label: s.EtruriaSuppliers.supplierFirstAgreementModel.find(s => s.TyLine === tyLine).Label
      }
    });
  }
)

export const getListLineAllPurchased = (year: number) => createSelector(
  getSupplierState,
  (s) => {
    // console.log('getListLineAllPurchased', s.EtruriaSuppliers.supplierFirstAgreementModel)
    return [...new Set(s.EtruriaSuppliers?.supplierFirstAgreementModel?.map(item => item.TyLine))].map(tyLine => {

      const t = (s.EtruriaSuppliers?.supplierActive?.Purchased?.filter(p => p.Year === +year)?.reduce((r, o) =>
        (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {}));
      // console.log('t', t)
      if (t) {
        const p = Object.values<SupplierPurchasedModel>(t)
        return {
          Year: year,
          TyLine: tyLine,
          Label: s.EtruriaSuppliers.supplierFirstAgreementModel.find(s => s.TyLine === tyLine).Label,
          Purchased: p[0].Purchased,
        } as SupplierPurchasedModel
      } else null;
    }

    );
  }
)

export const getPurchasedValueByYearLine = (year: number, line: string) => createSelector(
  getSupplierState,
  (s) => {

    const t = (s.EtruriaSuppliers.supplierActive?.Purchased.filter(p => p.Year === +year && p.TyLine.trim() === line.trim())?.reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {}))
    if (t) {
      return Object.values<SupplierPurchasedModel>(t).map(p => p.Purchased)[0]
    }
    else return null;
  }
)

export const getPurchasedValueByYear = (year: number) => createSelector(
  getSupplierState,
  (s) => {
    const t = (s.EtruriaSuppliers?.supplierActive?.Purchased.filter(p => p.Year === +year)?.reduce((r, o) =>
      (r[o.Year] ? (r[o.Year].Purchased += o.Purchased) : (r[o.Year] = { ...o }), r), {}))
    if (t)
      return Object.values<SupplierPurchasedModel>(t).map(p => p.Purchased)[0];
    else return null;
  }
)

export const getFirstAgreement = createSelector(
  getSupplierState,
  (s) => {
    return s ? [...s.EtruriaSuppliers.supplierFirstAgreementModel].sort((a, b) => { return a.TyLine < b.TyLine ? -1 : 1; }) : null;
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
  getFirstAgreement,
  (s, f) => {
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

export const getCurrentYear = createSelector(
  getSupplierState,
  (s) => s.EtruriaSuppliers.currentYear
);

export const getBeforeYear = createSelector(
  getSupplierState,
  (s) => s.EtruriaSuppliers.beforeYear
);

export const getYearsBench = createSelector(
  getSupplierState,
  (s) => {
    const years = [];
    years.push(s.EtruriaSuppliers.beforeYear.toString());
    years.push(s.EtruriaSuppliers.currentYear.toString());
    return years;
  }

)

export const getCrossLine = (TyLine: string) => createSelector(
  getSupplierState,
  getSupplierList,
  (s, l) => {
    const scl = { ...s.EtruriaSuppliers.supplierCrossLine.find(s => s.TyDiscountLine === TyLine) } || null;
    if (Object.keys(scl).length === 0) return null;

    if (scl) {
      scl.Supplier = l.find(s => s.Id === scl.IdSupplier && s.SubId === scl.SubIdSupplier) || null;
      scl.DiscountLine = { TyDiscountLine: scl.TyDiscountLineCross, Label: scl.LabelDiscountLineCross }
    }
    return scl || null
  }
)
