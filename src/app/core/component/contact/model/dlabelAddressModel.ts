export class DLabelAddressModel {
   Id: number;
   Label: string;

   constructor() {
      this.Id = null;
      this.Label = '';
   }
}

export interface DLabelAddressSearch {
   pId: number;
   pLabel: string;
}
