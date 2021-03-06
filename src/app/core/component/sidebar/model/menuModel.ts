export interface MenuModel {
  Id: number;
  Label: string;
  Path: string;
  Ico?: string;
  IcoName?: string;
  IdParent?: number;
  Order?: string;
  Read?: boolean;
  Insert?: boolean;
  Update?: boolean;
  Delete?: boolean;
  MenuCollection?: MenuModel[];
}
