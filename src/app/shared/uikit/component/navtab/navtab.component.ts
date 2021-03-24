import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dp-navtab',
  templateUrl: './navtab.component.html',
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
    this.tabClicked.emit(i);
  }

  public selectTab(id: number) {
    this.selectedTab = this.collectionTab[id];
  }

}
