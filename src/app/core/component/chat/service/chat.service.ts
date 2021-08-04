import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageChatModel, UserChatModel } from '../model/messageChatModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private hubConnection: HubConnection
  public messagges: MessageChatModel[] = [];
  public users$: BehaviorSubject<UserChatModel[] | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private store: Store) {
    this.users$.subscribe(u => console.log('pd', u))
  }

  ngOnDestroy(): void {
    this.users$.next(null);
  }

  private chatHubConnection = (userId) => new HubConnectionBuilder()
    .withUrl(environment.chatUrl, { accessTokenFactory: () => userId })
    // .configureLogging(LogLevel.Trace)
    .build();

  public connect = (userId) => {
    this.startConnection(userId);
    this.addListeners();
  }
  public disconnect = () => {
    this.hubConnection.stop();
  }

  private startConnection(userId: string) {
    this.hubConnection = this.chatHubConnection(userId);
    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err))
  }

  private addListeners() {
    this.hubConnection.on("usersReceivedFromApi", (data: any) => {
      console.log("user received from API Controller", data)
    })
    this.hubConnection.on("messageReceivedFromApi", (data: MessageChatModel) => {
      console.log("message received from API Controller")
      this.messagges.push(data);
    })
    this.hubConnection.on("messageReceivedFromHub", (data: MessageChatModel) => {
      console.log("message received from Hub")
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
    return this.http.post(environment.signalRUrl + 'chatcontroller/send', this.buildChatMessage(message))
      .pipe(tap(_ => console.log("message sucessfully sent to api controller")));
  }

  public sendMessageToHub(message: string) {
    var promise = this.hubConnection.invoke("BroadcastAsync", this.buildChatMessage(message))
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private buildChatMessage(message: string): MessageChatModel {
    console.log('buildChatMessage', this.hubConnection)
    return {
      ConnectionId: this.hubConnection.connectionId,
      Text: message,
      Ts: new Date(),
    };
  }
}
