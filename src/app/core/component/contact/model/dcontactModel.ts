export class DContactModel {
   Id: number;
   Label: string;
   Acronym: string;

   constructor() {
      this.Id = null;
      this.Label = '';
      this.Acronym = '';
   }
}

export interface DContactSearch {
   pId: number;
   pLabel: string;
}
