import { DRegionModel } from './dregionModel';
export interface AdministrativeAreaModel {
  Id: number;
  DsAdministrativeArea: string;
  District: string;
  Cap: string;
  CdCatasto: string;
  CdIstat: string;
  IdRegion: number;
  DRegion: DRegionModel;
}

export interface AdministrativeAreaSearch {
  pId?: number;
  pLabel?: string;
}
