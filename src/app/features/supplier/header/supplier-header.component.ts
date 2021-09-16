import { getCurrentYear, getBeforeYear } from './../store/supplier.selectors';
import { Store } from '@ngrx/store';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';

@Component({
  selector: 'app-supplier-header',
  template: `
        <div class="card-header d-flex justify-content-between">
          <h5>Fornitore
            <span>
              <span *ngIf="supplier">: {{supplier.Id}}.{{supplier.SubId}} - {{supplier.BusinessName}}</span>
            </span>
          </h5>
          <span class="pr-1" class="form-inline d-flex justify-content-between">
            <span class=" form-inline" *ngIf="supplier">
              <span>
                <label (click)="onClickLabelCurrentYear(currentYear)" [ngClass]="{'d-none': showEditCY===true}"
                  class="btn">
                  {{currentYear.value}}
                </label>
                <input class="form-control form-control-sm" type="number" min="2020"
                  (focus)="onFocusNumber($event)" (focusout)="showEditCY = !showEditCY" [(ngModel)]="cy"
                  [ngClass]="{'d-none': showEditCY===false}" #currentYear>
              </span>
              /
              <span>
                <label (click)="onClickLabelBeforeYear(beforeYear)" [ngClass]="{'d-none': showEditBY===true}"
                  class="btn">
                  {{beforeYear.value}}
                </label>
                <input class="form-control form-control-sm " type="number" min="2020" #beforeYear
                  (focus)="onFocusNumber($event)" (focusout)="showEditBY = !showEditBY" [(ngModel)]="by"
                  [ngClass]="{'d-none': showEditBY===false}">
              </span>
              <!-- <button type="button" class="btn btn-sm" (click)="onclickBtnRedo($event)">
                <fa-icon [icon]="['fas','undo']"></fa-icon>
              </button> -->
            </span>
            <a href="#" (click)="listChartLineClick($event)" class="col-1" *ngIf="supplier">
              <fa-icon [icon]="['fas','chart-line']" size="2x" style="color: rgb(65, 63, 63);"></fa-icon>
            </a>
            <a href="#" (click)="listSupplierClick($event)" class="col-1" *ngIf="supplier">
              <fa-icon [icon]="['fas','ellipsis-v']" size="2x" style="color: rgb(65, 63, 63);">
              </fa-icon>
            </a>
          </span>
        </div>
  `,
  styles: [`
  `]
})
export class SupplierHeaderComponent implements OnInit, OnChanges {
  @ViewChild('currentYear', { read: ElementRef }) currentYear: ElementRef
  @ViewChild('beforeYear', { read: ElementRef }) beforeYear: ElementRef

  @Input() supplier: SupplierModel | undefined;
  @Input() cy: number | undefined;
  @Input() by: number | undefined;
  @Output() listSupplierClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() listChartLineClickEvent: EventEmitter<any> = new EventEmitter();

  showEditCY = false;
  showEditBY = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  onClickLabelCurrentYear(e: any) {
    this.showEditCY = !this.showEditCY;
    setTimeout(() => { this.currentYear.nativeElement.focus(); })
  }
  onClickLabelBeforeYear(e: any) {
    this.showEditBY = !this.showEditBY;
    setTimeout(() => { this.beforeYear.nativeElement.focus(); })
  }

  onFocusNumber(e) {
    const target = e.currentTarget;
    target.type = "text";
    target.setSelectionRange(0, target.value.length);
    target.type = "number";
  }

  onclickBtnRedo(e: Event) {
    console.log('onclickBtnRedo');
  }

  listSupplierClick(e: Event) {
    e.preventDefault();
    this.listSupplierClickEvent.emit(true);
  }

  listChartLineClick(e: Event) {
    e.preventDefault();
    this.listChartLineClickEvent.emit(true);
  }
}
