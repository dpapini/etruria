import { StateModel } from './stateModel';
import { DRoleModel } from './droleModel';
import { ContactModel } from '../../contact/model/contactModel';

export interface UserModel {
  Id: number;
  Userid: string;
  Psw: string;
  PswNew: string;
  PswNewConfirm: string;
  PswSalt: string;
  IdRole: number;
  TsPwd: Date;
  IdState: number;
  TsState: Date;
  Role: DRoleModel;
  State: StateModel;
  Tag: string;
  IdContact: number;
  IdBuyer: number;
  Contact: ContactModel;
  TsLogged: Date;
  StateConnect: boolean;
}

export interface UserSearch {
  pId?: number;
  pTyRicerca?: UserTipologiaRicerca;
}

export enum UserTipologiaRicerca {
  NESSUNO,
  NORMALE,
  RICERCA,
}
