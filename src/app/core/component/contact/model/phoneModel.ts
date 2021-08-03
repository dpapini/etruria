import { DPhoneModel } from "./dphoneModel";

export interface PhoneModel {
  Id: number;
  TyPhone: number;
  DPhone: DPhoneModel;
  NrPhone: string;
  IdContact: number;
}

export interface TelefonoSearch {
  pId?: number;
  pIdContact?: number;
}
