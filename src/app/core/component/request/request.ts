import { UserModel } from "../user/model/userModel";

export class RequestModel {
  Id: number;
  CdRequest: string;
  TsRequest: Date;
  IdUser: number;
  Path: string;
  TsAnswer: Date;
  TsView: Date;
  User: UserModel;
  constructor() {
    this.Id = null;
    this.CdRequest = null;
    this.TsRequest = null;
    this.IdUser = null;
    this.Path = null;
    this.TsAnswer = null;
    this.TsView = null;
    this.User = null;
  }
}
export interface RequestSearchModel {
  pId?: number;
  pIdUser?: number;
  pTsAnswer?: Date;
  pTyRequest?: TYPEREQUEST
}

export enum TYPEREQUEST {
  NESSUNO,
  BENCHMARKXLSX,
}
