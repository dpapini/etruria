export interface MessageChatModel {
  Text: string;
  ConnectionId: any;
  Ts: Date;
  UserId?: string;
}

export interface UserChatModel {
  UserId: string;
  ConnectionsId: string[];
}
