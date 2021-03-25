import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CounterupModel } from './model/counterupModel';

@Component({
  selector: 'app-counterup',
  templateUrl: './counterup.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class CounterupComponent implements OnInit {
  @Input() source: CounterupModel = new CounterupModel();
  @Output() OnClickCorner: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onClickCorner(e) {
    e.preventDefault();
    this.OnClickCorner.emit(e);
  }
}
