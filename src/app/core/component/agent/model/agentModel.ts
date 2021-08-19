import { StateModel } from '../../user/model/stateModel';
import { ContactModel } from 'src/app/core/component/contact/model/contactModel';
import { DRoleModel } from 'src/app/core/component/user/model/droleModel';

export interface AgentModel {
  Id: number;
  IdParent: number;
  TyRole: number;
  DRole: DRoleModel
  IdContact: number;
  Contact: ContactModel;
  TyState: number;
  State: StateModel;
  TsState: Date;
  IdUser: number;
  UserId: string
}

export interface AgentSearchModel {
  pId: number
  pBusinessName: string
  pTySearch: AgentTypeSearch
}

export enum AgentTypeSearch {
  DETAIL,
  SEARCH,
}
