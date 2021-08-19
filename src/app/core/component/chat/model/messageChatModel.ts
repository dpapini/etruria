import { UserModel } from 'src/app/core/component/user/model/userModel';
export interface MessageChatModel {
  Text: string;
  ConnectionId: any;
  Ts: Date;
  UserSend?: UserModel;
  UserReceiver?: UserModel;
}

export interface UserChatModel {
  UserId: string;
  ConnectionsId: string[];
}
