import { SupplierPurchasedModel } from "./supplierPurchased";

export class SupplierModel {
  Id: number;
  SubId: number;
  BusinessName: string;
  Purchased: SupplierPurchasedModel[];

  constructor() {
    this.Id = null;
    this.SubId = null;
    this.BusinessName = null;
    this.Purchased = new Array<SupplierPurchasedModel>();
  }
}

export interface SupplierSearch {
  pId?: number;
  pSubId?: number;
  pLabel?: string;
  pYear?: number;
  pOffSet?: number;
  pNextRow?: number;
  pIdBuyer?: number;
}
