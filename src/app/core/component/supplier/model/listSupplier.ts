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

export interface ListSupplierSearch {
   pId?: number;
   pSubId?: number;
}