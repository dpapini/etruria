export class SupplierPurchasedModel {
   Year: number;
   TyLine: string;
   Purchased: number;

   constructor() {
      this.Year = null;
      this.TyLine = null;
      this.Purchased = null;
   }
}

export interface SupplierPurchasedSearch {
   pId?: number;
   pSubId?: number;
   pYear?: number;
}