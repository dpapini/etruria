import { StateModel } from './stateModel';
import { RoleModel } from './roleModel';

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
    Role: RoleModel;
    State: StateModel;
    Tag: string;
    IdContact: number;
    Contact: ContactModel;
    TsLogged: Date;
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