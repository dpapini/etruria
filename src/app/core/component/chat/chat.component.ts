import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { UserChatModel } from './model/messageChatModel';
import { ChatService } from './service/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [``]
})
export class ChatComponent implements OnInit, OnChanges {
  frmChatCollapsed = false;
  @Input() user: UserModel;
  @Input() userId: string;
  @Input() userList: UserModel[];

  userConnect$: Observable<UserChatModel[]>;
  usersChat: UserModel[] = [];
  isOnline = false;

  constructor(private store: Store
    , private chatServive: ChatService) {

    this.userConnect$ = this.chatServive.users$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { userId, userList } = changes;

    if (userId && userId.currentValue) {
      this.chatServive.connect(userId.currentValue);
    }
    if (userList && userList.currentValue) {
      this.userConnect$
        .pipe(
          map(uc =>
            this.userList.map(u => {
              return { ...u, StateConnect: uc[u.Userid] !== undefined }
            })
          ))
        .subscribe(u => {
          this.isOnline = u.filter(u => u.Userid === this.userId)[0]?.StateConnect;
          this.usersChat = u?.sort((a, b) => a.Userid < b.Userid ? -1 : 1)
        })
    }
  }

  ngOnInit(): void {
  }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event) {
    this.chatServive.disconnect()
  }

}
