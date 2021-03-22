export class DPhoneModel {
   Id: number;
   Label: string;
   Regex: string;

   constructor() {
      this.Id = null;
      this.Label = '';
      this.Regex = '';
   }
}

export interface DPhoneSearch {
   pId: number;
   pLabel: string;
}