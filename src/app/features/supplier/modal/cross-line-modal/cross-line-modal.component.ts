import { SupplierModel } from './../../../../core/component/supplier/model/supplier';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cross-line-modal',
  templateUrl: './cross-line-modal.component.html',
  styles: [``]
})
export class CrossLineModalComponent implements OnInit {
  @Input() yearCross: number;

  frmCrossLine = this.fb.group({
    IdSupplier: [null],
  })

  constructor(public activeModal: NgbActiveModal
    , private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onClickResetCrossLine(e: Event) { }

  selectSupplierClick(e: SupplierModel) {
    console.log('selectSupplierClick', e)
  }
}
