export interface SupplierInvoiceModel {
  IdSupplier: number;
  SubIdSupplier: number;
  IdField?: number;
  SubIdField?: number;
  Year?: number;
  DtDocument?: Date;
  Im: number;
}

export interface SupplierInvoiceSearch {
  pIdSupplier?: number;
  pSubIdSupplier?: number;
  pIdField?: number;
  pSubIdField?: number;
  pDtStart: Date;
  pDtEnd: Date;
}


