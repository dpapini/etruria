import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CounterupModel } from './model/counterupModel';

@Component({
  selector: 'app-counterup',
  templateUrl: './counterup.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class CounterupComponent implements OnInit {
  @Input() source: CounterupModel = {}
  @Output() OnClickCorner: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onClickCorner(e) {
    e.preventDefault();
    this.OnClickCorner.emit(e);
  }
}
