
import { AdministrativeAreaModel } from './adminstrativeAreaModel';
import { DLabelAddressModel } from './dlabelAddressModel';
export class AddressModel {
   Id: number;
   TyLabel: number;
   DLabelAddress: DLabelAddressModel;
   DsAddress: string;
   Cap: string;
   IdAdministrativeArea: number;
   AdministrativeArea: AdministrativeAreaModel;
   IdContact: number;
   Latitude: number;
   Longitude: number;

   constructor() {
      this.Id = null;
      this.TyLabel = null;
      this.DLabelAddress = new DLabelAddressModel();
      this.DsAddress = '';
      this.Cap = '';
      this.IdAdministrativeArea = null;
      this.AdministrativeArea = new AdministrativeAreaModel();
      this.IdContact = null;
      this.Latitude = null;
      this.Longitude = null;
   }

}

export interface AddressSearch {
   pId: number;
   pIdContact: number;
}