import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './../../core/component/chat/service/chat.service';

const currentYear: number = new Date().getFullYear();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`  `],
  providers: [
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscribtions: Subscription[] = [];
  mes = '';

  constructor(public chatService: ChatService) {
  }

  ngOnDestroy(): void { this.subscribtions.forEach(s => s.unsubscribe()) }

  ngOnInit(): void {
    // this.chatService.connect();
  }
  sendMessage() {
    this.chatService.sendMessageToHub(this.mes).subscribe({
      next: _ => this.mes = '',
      error: (err) => console.error(err)
    });
  }
}
