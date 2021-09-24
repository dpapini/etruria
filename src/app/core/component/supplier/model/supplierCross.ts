import { SupplierDiscountLine } from './supplierAgreement';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';

export interface SupplierCrossModel {
  Id: number;
  SubId: number;
  Year: number;
  TyDiscountLine: string;
  IdSupplier: number;
  SubIdSupplier: number;
  TyDiscountLineCross: string;
  LabelDiscountLineCross: string;
  PcDiscountHeader: number;
  PcDiscountPremia: number;
  Supplier?: SupplierModel
  DiscountLine?: SupplierDiscountLine
}

export interface SupplierCrossSearch {
  pId?: number;
  pSubId?: number;
  pYear?: number;
  pTyDiscountLine?: string;
}
