export interface SupplierPurchasedModel {
  Year: number;
  TyLine: string;
  Label: string;
  Purchased: number;
}

export interface SupplierPurchasedSearch {
  pId?: number;
  pSubId?: number;
  pYear?: number;
}


