import { SupplierInvoiceModel } from './supplierInvoice';
import { SupplierPurchasedModel } from "./supplierPurchased";

export interface SupplierModel {
  Id: number;
  SubId: number;
  BusinessName?: string;
  Purchased: SupplierPurchasedModel[];
  PurchasedAtDate: SupplierInvoiceModel;
  BuyerId?: string;
}

export interface SupplierSearch {
  pId?: number;
  pSubId?: number;
  pLabel?: string;
  pYear?: number;
  pOffSet?: number;
  pNextRow?: number;
  pIdBuyer?: number;
  pFilter?: string;
}
