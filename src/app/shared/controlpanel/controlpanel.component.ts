import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';


@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styles: []
})
export class ControlpanelComponent implements OnInit, OnChanges {

  @Input() showBtnDelete = false;
  @Input() frmInvalid: boolean;
  @Input() tsValidita: Date;
  @Input() userId: string;

  @Output() btnAnnullaClick: EventEmitter<any> = new EventEmitter();
  @Output() btnSalvaClick: EventEmitter<any> = new EventEmitter();
  @Output() btnEliminaClick: EventEmitter<any> = new EventEmitter();

  disabledDelete: boolean;
  disabledSave: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { showBtnDelete, frmInvalid, tsValidita, userId } = changes;

    this.disabledDelete = frmInvalid.currentValue;
    this.disabledSave = frmInvalid.currentValue;
  }


  ngOnInit(): void {

  }

  btnSalvaOnClick(e: Event) {
    e.preventDefault();
    this.btnSalvaClick.emit(e);
  }

  btnEliminaOnClick(e: Event) {
    e.preventDefault();
    this.btnEliminaClick.emit(e);
  }

  btnAnnullaOnClick(e: Event) {
    e.preventDefault();
    this.btnAnnullaClick.emit(e);
  }
}
