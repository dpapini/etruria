export class DIsoModel {
   Id: number;
   Label: string;
   Code: string;

   constructor() {
      this.Id = null;
      this.Label = '';
      this.Code = '';
   }
}

export interface DISoSearch {
   pId: number;
   pLabel: string;
}
