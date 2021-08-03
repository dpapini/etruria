
import { AdministrativeAreaModel } from './adminstrativeAreaModel';
import { DLabelAddressModel } from './dlabelAddressModel';
export interface AddressModel {
  Id: number;
  TyLabel: number;
  DLabelAddress: DLabelAddressModel;
  DsAddress: string;
  IdAdministrativeArea: number;
  AdministrativeArea: AdministrativeAreaModel;
  IdContact: number;
  Latitude: number;
  Longitude: number;
}

export interface AddressSearch {
  pId: number;
  pIdContact: number;
}
