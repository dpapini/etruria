import { SupplierPurchasedModel } from "./supplierPurchased";

export interface SupplierAgreementModel {
  IdSupplier: number;
  SubIdSupplier: number;
  TyLine: string;
  Label: string;
  Pc: number;
  Year: number;
  TipologiaDiscount: TipologiaAgreement
  DsStateDeal: string;
  DsTypeDeal: string;
  DsBuyer: string;
}

export interface SupplierAgreementSearch {
  pId?: number;
  pSubId?: number;
  pYear?: number;
  pPurchases?: SupplierPurchasedModel[];
}

export enum TipologiaAgreement {
  HEADER,
  PREMIA,
}

export interface SupplierFirstAgreementModel {
  TyLine: string;
  Label: string;
  Cy: number;
  Yb: number;
  hCY: number;
  hYB: number;
  pCY: number;
  pYB: number;
  stateDeal: string;
  typeDeal: string
}
