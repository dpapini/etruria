export class DRegionModel {
   Id: number;
   Label: string;

   constructor() {
      this.Id = null;
      this.Label = '';
   }
}

export interface DRegionSearch {
   pId: number;
   pLabel: string;
}