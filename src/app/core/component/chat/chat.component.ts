import { Component, ComponentFactoryResolver, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { UserChatModel } from './model/messageChatModel';
import { ChatService } from './service/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [``]
})
export class ChatComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chatDiscussions', { read: ViewContainerRef }) chatDiscussions: ViewContainerRef;
  frmChatCollapsed = true;
  @Input() user: UserModel;
  @Input() userId: string;
  @Input() userList: UserModel[];

  subscription = new Subscription();
  userConnect$: Observable<UserChatModel[]>;
  usersChat$ = new Subject<UserModel[]>();
  isOnline = false;
  usersChat: UserModel[] = [];

  constructor(private chatServive: ChatService
    , private cfr: ComponentFactoryResolver) {
    this.userConnect$ = this.chatServive.users$.asObservable();
    this.chatServive.message$.pipe(filter(data => data !== undefined && data !== null)).subscribe(data => {
      this.loadChatDiscussion(data.UserSend);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { userId, userList } = changes;

    if (userId && userId.currentValue) {
      this.chatServive.connect(userId.currentValue);
    }

    if (userList && userList.currentValue && userList.currentValue.length > 0 && userList.currentValue !== userList.previousValue) {
      this.subscription.add(
        this.userConnect$
          .pipe(
            filter(uc => uc !== null),
            map(uc => {
              return userList.currentValue.map(u => {
                return { ...u, StateConnect: uc[u.Userid] !== undefined }
              })
            }
            ))
          .subscribe(u => {
            this.isOnline = u.filter(u => u.Userid === this.userId)[0]?.StateConnect;
            this.usersChat$.next(u.sort((a, b) => a.Userid < b.Userid ? -1 : 1));
          }));
    }
  }

  ngOnInit(): void { }

  loadChatDiscussion(u: UserModel) {
    if (this.usersChat.findIndex(us => us.Userid === u.Userid) >= 0) return;
    import('./discussion/chat-discussion.component').then(
      ({ ChatDiscussionComponent }) => {
        let chatDiscussionComponent = this.chatDiscussions.createComponent(
          this.cfr.resolveComponentFactory(ChatDiscussionComponent)
        );
        this.usersChat.push(u);
        chatDiscussionComponent.instance.user = u;
        chatDiscussionComponent.instance.onClickClose.subscribe(() => {
          this.chatDiscussions.detach(this.chatDiscussions.indexOf(chatDiscussionComponent.hostView)),
            this.usersChat = [...this.usersChat.filter(u => u.Userid !== chatDiscussionComponent.instance.user.Userid)];
        }
        )
        chatDiscussionComponent.instance.sendMessage.subscribe((data) =>
          this.chatServive.sendMessageToApi2Id(data.message, this.user, data.userReceiver).subscribe()
        )
      }
    )
  }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event) {
    this.chatServive.disconnect()
  }

}
