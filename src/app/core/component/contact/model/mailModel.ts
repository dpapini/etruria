import { DMailModel } from './dmailModel';
export class MailModel {
   Id: number;
   TyMail: number;
   DMail: DMailModel;
   EMail: string;
   FlPec: boolean;
   IdContatto: number;
}

export interface MailSearch {
   pId: number;
   pIdContatto: number;
   pEmail: string;
}
