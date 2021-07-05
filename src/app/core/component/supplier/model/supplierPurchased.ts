export class SupplierPurchasedModel {
  Year: number;
  TyLine: string;
  Label: string;
  Purchased: number;

  constructor() {
    this.Year = null;
    this.TyLine = null;
    this.Label = null;
    this.Purchased = null;
  }
}

export interface SupplierPurchasedSearch {
  pId?: number;
  pSubId?: number;
  pYear?: number;
}
