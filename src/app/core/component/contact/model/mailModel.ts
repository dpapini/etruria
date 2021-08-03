import { DMailModel } from './dmailModel';
export interface MailModel {
  Id: number;
  TyMail: number;
  DMail: DMailModel;
  EMail: string;
  FlPec: boolean;
  IdContact: number;
}

export interface MailSearch {
  pId?: number;
  pIdContact?: number;
  pEmail?: string;
}
