export class DetectionPriceModel {
   IdSupplier: number;
   SubIdSupplier: number;
   CdArea: number;
   LabelArea: string;
   CdSector: number;
   LabelSector: string;
   Express: number;
   Market: number;

   constructor() {
      this.IdSupplier = null;
      this.SubIdSupplier = null;
      this.CdArea = null;
      this.LabelArea = null;
      this.CdSector = null;
      this.LabelSector = null;
      this.Express = null;
      this.Market = null;
   }
}

export interface DetectionPriceSearch {
   pIdSupplier: number;
   pSubIdSupplier: number;
}