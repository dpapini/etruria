import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../user/model/userModel';

@Component({
  selector: 'app-discussion',
  templateUrl: './chat-discussion.component.html',
  styleUrls: ['./chat-discussion.component.scss']
})
export class ChatDiscussionComponent implements OnInit {
  @Input() user: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

}
