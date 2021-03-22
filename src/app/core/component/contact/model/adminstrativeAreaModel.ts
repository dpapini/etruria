import { DRegionModel } from './dregionModel';
export class AdministrativeAreaModel {
   Id: number;
   DsAdministrativeArea: string;
   District: string;
   Cap: string;
   CdCatasto: string;
   CdIstat: string;
   IdRegion: number;
   DRegion: DRegionModel;

   constructor() {
      this.Id = null;
      this.DsAdministrativeArea = '';
      this.District = '';
      this.Cap = '';
      this.CdCatasto = '';
      this.CdIstat = '';
      this.IdRegion = null;
      this.DRegion = new DRegionModel();
   }
}

export interface AdministrativeAreaSearch {
   pId: number;
   pLabel: string;
}
