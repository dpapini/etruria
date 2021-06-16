export class ListSupplierModel {
  IdSupplier: number;
  SubIdSupplier: number;
  IdField: number;
  SubIdField: number
  Im: number;
}

export class ListSupplierIndexModel {
  IdxCyYb: number;
  IdxYbYb1: number;
}

export class ListSupplierIndexDetailModel {
  IdSupplier: number;
  SubIdSupplier: number;
  TyLine: string;
  Label: string;
  ImBaseCostBy: number;
  ImBaseCostCy: number;
  ImBy: number;
  ImCy: number;
  ImGrowList: number;
  ImSimulateCostBy: number;
  PcList: number;
  QtBy: number;
  QtCy: number;
}

export interface ListSupplierSearch {
  pId?: number;
  pSubId?: number;
  pYear?: number
}
