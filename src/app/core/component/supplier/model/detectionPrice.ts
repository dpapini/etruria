export interface DetectionPriceModel {
  IdSupplier: number;
  SubIdSupplier: number;
  CdArea: number;
  LabelArea: string;
  CdSector: number;
  LabelSector: string;
  Express: number;
  Market: number;
  Total: number;
}

export interface DetectionPriceSearch {
  pIdSupplier?: number;
  pSubIdSupplier?: number;
  pTyRicerca?: DetectionPriceTipologiaRicerca;
  pIdLine?: number[];
}

export enum DetectionPriceTipologiaRicerca {
  LINE,
  AREA,
  SECTOR,
  GROUP,
  TOTAL
}
