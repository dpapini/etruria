export class SupplierModel {
   Id: number;
   SubId: number;
   BusinessName: number;

   constructor() {
      this.Id = null;
      this.SubId = null;
      this.BusinessName = null;
   }
}

export interface SupplierSearch {
   pId?: number;
   pSubId?: number;
   pLabel?: string;
   pOffSet?: number;
   pNextRow?: number;
}