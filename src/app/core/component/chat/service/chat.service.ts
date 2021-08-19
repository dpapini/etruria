import { UserModel } from 'src/app/core/component/user/model/userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { EventEmitter } from 'node:stream';
import { BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageChatModel, UserChatModel } from '../model/messageChatModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

export const chatHubConnection = (userId) => new HubConnectionBuilder()
  .withUrl(environment.chatUrl, { accessTokenFactory: () => userId })
  // .configureLogging(LogLevel.Trace)
  .build();

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private hubConnection: HubConnection
  public messagges: MessageChatModel[] = [];
  public users$: BehaviorSubject<UserChatModel[] | null> = new BehaviorSubject(null);
  public message$: BehaviorSubject<MessageChatModel | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private store: Store) {
  }

  ngOnDestroy(): void {
    this.users$.next(null);
  }
  public connect = (userId) => {
    this.startConnection(userId);
    this.addListeners();
  }
  public disconnect = () => {
    this.hubConnection.stop();
  }

  private startConnection(userId: string) {
    this.hubConnection = chatHubConnection(userId);
    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("usersReceivedFromApi", (data: any) => {
      console.log("user received from API Controller", data)
    })
    this.hubConnection.on("messageReceivedFromApi", (data: MessageChatModel) => {
      this.messagges.push(data);
    })
    this.hubConnection.on("messageReceivedFromApi2Id", (data: MessageChatModel) => {
      this.message$.next(data);
    })
    this.hubConnection.on("messageReceivedFromHub", (data: MessageChatModel) => {
      this.messagges.push(data);
    })
    this.hubConnection.on("UsersConnected", (ucm) => {
      this.users$.next(ucm)
    })
    this.hubConnection.on("UserDisconnected", (ucm) => {
      this.users$.next(ucm)
    })
  }


  public sendMessageToApi(message: string) {
    return this.http.post(environment.signalRUrl + 'chat/send', this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  }

  public sendMessageToApi2Id(message: string, userSend: UserModel, userReceiver: UserModel) {
    return this.http.post(environment.signalRUrl + 'chat/send2Id', this.buildChatMessage(message, userSend, userReceiver))
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private buildChatMessage(message: string, userSend?: UserModel, userReceiver?: UserModel): MessageChatModel {
    return {
      ConnectionId: this.hubConnection.connectionId,
      Text: message,
      Ts: new Date(),
      UserSend: userSend || null,
      UserReceiver: userReceiver || null,
    };
  }
}
