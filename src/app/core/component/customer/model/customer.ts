import { StateModel } from './../../user/model/stateModel';
import { ContactModel } from 'src/app/core/component/contact/model/contactModel';
import { DCustomerModel } from './dcustomerModel';
import { AgentModel } from '../../agent/model/agentModel';
import { DCustomerChannelModel } from './dcustomerChannelModel';
import { DCustomerStateModel } from './dcustomerStateModel';

export interface CustomerModel {
  Id: number;
  IdParent: number;
  DtStart: Date;
  TyCustomer: number;
  DCustomer: DCustomerModel;
  IdContact: number;
  Contact: ContactModel;
  IdAgent: number;
  Agent: AgentModel;
  TyChannell: number;
  DCustomerChannel: DCustomerChannelModel;
  IdCustomerState: number;
  DCustomerState: DCustomerStateModel;
  TsState: Date;
  IdState: number;
  State: StateModel;
  Sdi: string;
  IdUser: number;
  UserId: number;
  TsValid: Date
}

export interface CustomerSearch {
  pId?: number;
  pIdParent?: number;
  pCdFiscale?: string;
  pPartitaIva?: string;
  pLabel?: string;
  pTyCustomer?: number;
  pTySearch?: CustomerTypeSearch;
  OffSet: number;
  NextRow: number;
}

export enum CustomerTypeSearch {
  DETAIL,
  SEARCH,
}
