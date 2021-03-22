import { AddressModel } from "./addressModel";
import { AdministrativeAreaModel } from "./adminstrativeAreaModel";
import { DContactModel } from "./dcontactModel";
import { DGenderModel } from "./dgenderModel";
import { DIsoModel } from "./disoModel";
import { MailModel } from "./mailModel";
import { PhoneModel } from "./phoneModel";

export class ContactModel {
   Id: number;
   TyContact: number;
   DContact: DContactModel;
   Surname: string;
   Name: string;
   BussinessName: number;
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


	constructor() {
      this.Id = null;
      this.TyContact = null;
      this.DContact = new DContactModel();
      this.Surname = null;
      this.Name = null;
      this.BussinessName = null;
      this.DGender = new DGenderModel();
      this.TsValid = null;
      this.DtBirth = null;
      this.IdAdministrativeArea = null;
      this.AdministrativeArea = new AdministrativeAreaModel();
      this.CdFiscale = null;
      this.PartitaIva = null;
      this.TyIso = null;
      this.DIso = new DIsoModel();
      this.WebSite = null;
      this.UserId = null;
      this.PhoneCollection = new Array<PhoneModel>();
      this.MailCollection = new Array<MailModel>();
      this.AddressCollection = new Array<AddressModel>();
   }

}

export interface ContattoSearch {
   pTyContact: number;
   pSurname: string;
   pName: string;
   pBusinessName: string;
   pCdFiscale: string;
   pPartitaIva: string;
   pLabel: string;
   pId: number;
   pIdUser: number;
}