export class DGenderModel {
   Id: number;
   Label: string;

   constructor() {
      this.Id = null;
      this.Label = null;
   }
}

export interface DGenderSearch {
   pId: number;
   pLabel: string;
}

