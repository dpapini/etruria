import { SupplierPurchasedModel } from "./supplierPurchased";

export class SupplierAgreementModel {
  IdSupplier: number;
  SubIdSupplier: number;
  TyLine: string;
  Label: string;
  Pc: number;
  Year: number;
  TipologiaDiscount: TipologiaAgreement

  constructor() {
    this.IdSupplier = null;
    this.SubIdSupplier = null;
    this.TyLine = null;
    this.Label = null;
    this.Pc = null
    this.Year = null;
    this.TipologiaDiscount = null;
  }
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
}
