export class DetectionPriceModel {
  IdSupplier: number;
  SubIdSupplier: number;
  CdArea: number;
  LabelArea: string;
  CdSector: number;
  LabelSector: string;
  Express: number;
  Market: number;
  Total: number;

  constructor() {
    this.IdSupplier = null;
    this.SubIdSupplier = null;
    this.CdArea = null;
    this.LabelArea = null;
    this.CdSector = null;
    this.LabelSector = null;
    this.Express = null;
    this.Market = null;
    this.Total = null;
  }
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
