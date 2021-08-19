import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { getUserModel } from '../../store/login/login.selectors';
import { MessageChatModel } from '../model/messageChatModel';
import { ChatService } from './../service/chat.service';

export interface chatMessage {
  userReceiver: UserModel;
  message: string;
}

@Component({
  selector: 'app-discussion',
  templateUrl: './chat-discussion.component.html',
  styleUrls: ['./chat-discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDiscussionComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('textAreaMessaggio', { read: ElementRef, static: true }) textAreaMessaggio: ElementRef;
  // @ViewChild('divMessagges', { read: ElementRef }) divMessagges: ElementRef;

  @Input() user: UserModel;
  @Output() onClickClose: EventEmitter<any> = new EventEmitter();
  @Output() sendMessage: EventEmitter<chatMessage> = new EventEmitter();

  messages: MessageChatModel[] = [];
  frmChatMessage: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private cdr: ChangeDetectorRef,
    public chatService: ChatService,
  ) {
    this.frmChatMessage = this.fb.group({
      Message: [null]
    });

  }

  ngOnDestroy(): void { }

  ngOnInit(): void {
    this.textAreaMessaggio?.nativeElement.focus();
    this.chatService.message$.pipe(filter(d => d !== null && d !== undefined)).subscribe(data => {
      this.messages.push(data);
      this.cdr.detectChanges();
    }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { user } = changes;
  }

  closeChatDiscussion(e: Event) {
    this.onClickClose.emit(e);
  }

  onKeyEnterMessage(e: Event) {
    e.preventDefault();
    if (!this.frmChatMessage.controls.Message.value) return;
    combineLatest(
      [this.store.pipe(select(getUserModel), take(1))]
    ).subscribe(user => {
      this.messages.push({
        ConnectionId: 1,
        Text: this.frmChatMessage.controls.Message.value,
        Ts: new Date(),
        UserSend: user[0] || null,
        UserReceiver: this.user || null,
      })
      this.sendMessage.emit({ userReceiver: this.user, message: this.frmChatMessage.controls.Message.value })
      this.frmChatMessage.controls.Message.reset();
    })

  }
}
