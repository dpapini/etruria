import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dp-navtab',
  template: `
    <ul class="nav" [className]="classText">
      <li *ngFor="let item of collectionTab; let i=index" class="nav-item">
          <a class="nav-link btn-sm py-0" href="#" [ngClass]="{'active': selectedTab===item}"
            (click)="onClick($event,item, i, disable)">
            {{item}}
          </a>
      </li>
    </ul>
  `,
  styles: [`
  `]
})
export class NavtabComponent implements OnInit {
  @Input() defaultTab: number;
  @Input() collectionTab: string[];
  @Input() classText: string;
  @Input() disable: boolean;
  @Output() tabClicked: EventEmitter<any> = new EventEmitter();

  selectedTab = null;
  constructor() { }

  ngOnInit(): void {
    this.selectedTab = this.collectionTab[this.defaultTab];
  }

  onClick(e, item, i, disable) {
    e.preventDefault();
    if (disable) return;
    this.selectedTab = item;
    this.tabClicked.emit({ step: i, data: item });
  }

  public selectTab(id: number) {
    this.selectedTab = this.collectionTab[id];
  }

}
