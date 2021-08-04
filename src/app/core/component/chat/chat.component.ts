import { ChatDiscussionComponent } from './discussion/chat-discussion.component';
import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
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
  frmChatCollapsed = false;
  @Input() user: UserModel;
  @Input() userId: string;
  @Input() userList: UserModel[];

  subscription = new Subscription();
  userConnect$: Observable<UserChatModel[]>;
  usersChat$ = new Subject<UserModel[]>();
  isOnline = false;

  constructor(private chatServive: ChatService
    , private vcref: ViewContainerRef
    , private cfr: ComponentFactoryResolver) {
    this.userConnect$ = this.chatServive.users$.asObservable();
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
      console.log('dentro', this.userConnect$)
      this.subscription.add(
        this.userConnect$
          .pipe(
            filter(uc => uc !== null),
            map(uc => {
              console.log('uc', uc, userList.currentValue)
              return userList.currentValue.map(u => {
                return { ...u, StateConnect: uc[u.Userid] !== undefined }
              })
            }
            ))
          .subscribe(u => {
            console.log('u', u)
            this.isOnline = u.filter(u => u.Userid === this.userId)[0]?.StateConnect;
            this.usersChat$.next(u.sort((a, b) => a.Userid < b.Userid ? -1 : 1));
          }));
    }
  }

  ngOnInit(): void { }

  loadChatDiscussion(u: UserModel) {
    console.log('loadChatDiscussion', u)
    this.vcref.clear();
    import('./discussion/chat-discussion.component').then(
      ({ ChatDiscussionComponent }) => {
        let chatDiscussionComponent = this.vcref.createComponent(
          this.cfr.resolveComponentFactory(ChatDiscussionComponent)
        );
        chatDiscussionComponent.instance.user = u;
      }
    )
  }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event) {
    this.chatServive.disconnect()
  }

}
