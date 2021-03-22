export class DMailModel {
   Id: number;
   Testo: string;

   constructor() {
      this.Id = null;
      this.Testo = '';
   }
}

export interface DMailSearch {
   pId: number;
   pTesto: string;
}
