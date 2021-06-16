import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dp-indicator',
  templateUrl: './indicator.component.html',
  styles: [`
  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: -20px;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    padding-left: 0;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  }
  .carousel-indicators .active {
    opacity: 1;
  }
  .carousel-indicators .active {
      opacity: 1;
  }
  .carousel-indicators li {
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 3px;
      margin-right: 3px;
      margin-left: 3px;
      text-indent: -999px;
      cursor: pointer;
      background-color: #181d1f;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: 0.5;
      transition: opacity 0.6s ease;
  }
  `]
})
export class IndicatorComponent implements OnInit {
  @Input() defaultTab: number;
  @Input() collectionTab: string[];
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
