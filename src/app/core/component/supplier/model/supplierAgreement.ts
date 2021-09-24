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
  By: number;
  hCY: number;
  hBY: number;
  pCY: number;
  pBY: number;
  stateDeal: string;
  typeDeal: string
}


export interface SupplierDiscountLine {
  TyDiscountLine: string;
  Label: string;
}
