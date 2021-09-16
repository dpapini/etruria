import { AddressModel } from "./addressModel";
import { AdministrativeAreaModel } from "./adminstrativeAreaModel";
import { DContactModel } from "./dcontactModel";
import { DGenderModel } from "./dgenderModel";
import { DIsoModel } from "./disoModel";
import { MailModel } from "./mailModel";
import { PhoneModel } from "./phoneModel";

export interface ContactModel {
  Id: number;
  TyContact: number;
  DContact: DContactModel;
  Surname: string;
  Name: string;
  BusinessName: number;
  DGender: DGenderModel;
  TsValid: Date;
  DtBirth: Date;
  IdAdministrativeArea: number;
  AdministrativeArea: AdministrativeAreaModel;
  CdFiscale: string;
  PartitaIva: string;
  TyIso: number;
  DIso: DIsoModel;
  WebSite: string;
  IdUser: number;
  UserId: string;
  PhoneCollection: PhoneModel[];
  MailCollection: MailModel[];
  AddressCollection: AddressModel[];
}

export interface ContactSearch {
  pTyContact?: number;
  pSurname?: string;
  pName?: string;
  pBusinessName?: string;
  pCdFiscale?: string;
  pPartitaIva?: string;
  pLabel?: string;
  pId?: number;
  pIdUser?: number;
  pTySearch?: ContactTypeSearch;
  OffSet?: number;
  NextRow?: number;
}

export enum ContactTypeSearch {
  NORMALE,
  RICERCA,
}
