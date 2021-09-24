import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SupplierModel, SupplierSearch } from 'src/app/core/component/supplier/model/supplier';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';

@Component({
  selector: 'app-search-supplier',
  template: `
    <ng-select [items]="supplierSearch$|async" bindVale="Id" bindLabel="BusinessName" [minTermLength]="3" autofocus
    #searchSupplier  typeToSearchText="Please enter 3 or more characters" [typeahead]="supplierInput$" placeholder="Selezionare il fornitore"
    dropdownPosition="auto" appendTo="body" class="ng-select-small col-12 p-0" [trackByFn]="trackByFn"
    [loading]="!(supplierSearch$|async)" (clear)="onSearchSupplierClear($event)"
    (change)="onSearchSupplierChange($event)" [virtualScroll]="true">
    <ng-template ng-option-tmp let-item="item" let-search="searchTerm">
      <div class="d-flex justify-content-between">
        <span>{{item.Id}}.{{item.SubId}} - {{item.BusinessName}}</span>
        <span>
          <fa-icon [icon]="['fas','ban']" *ngIf="item.disabled" style="color: red;"></fa-icon>
        </span>
      </div>
    </ng-template>
    <ng-template ng-loadingspinner-tmp>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </ng-template>
  </ng-select>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSupplierComponent),
      multi: true
    },
  ],
})
export class SearchSupplierComponent implements OnInit, ControlValueAccessor {
  @ViewChild('searchSupplier', { static: true }) searchSupplier: NgSelectComponent;
  @Output() selectSupplier: EventEmitter<SupplierModel> = new EventEmitter();
  @Output() clearSupplier: EventEmitter<boolean> = new EventEmitter(false);

  value: SupplierModel;
  disabled = false;
  supplierSearch$: Observable<SupplierModel[]> | null;
  supplierInput$ = new Subject<string>();

  constructor(private supplierService: SupplierService) { }

  writeValue(value: SupplierModel): void {
    this.searchSupplier.writeValue(value);
    this.onSearchSupplierChange(value);
  }
  registerOnChange(fn: any): void {
    this.searchSupplier.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.searchSupplier.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.searchSupplier.setDisabledState(isDisabled);
  }

  ngOnInit(): void {
    this.supplierSearch$ = concat(
      of([]), // default items
      this.supplierInput$.pipe(
        filter(term => term?.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {
          return this.supplierService.SupplierCollection({ pFilter: term } as SupplierSearch).pipe(catchError(() => of([])));
        }),
      )
    );
  }

  trackByFn(item: SupplierModel) { return item; }

  onSearchSupplierChange(e: SupplierModel) {
    if (e) {
      this.value = e;
      this.selectSupplier.emit(e);
    }
  }

  onSearchSupplierClear(e: SupplierModel) {
    this.clearSupplier.emit(true);
  }

}

