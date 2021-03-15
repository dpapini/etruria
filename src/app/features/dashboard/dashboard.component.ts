import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor() {
  }

  ngOnDestroy(): void { this.subscribtions.forEach(s => s.unsubscribe()) }

  ngOnInit(): void {
  }
}
