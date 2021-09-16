import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
    (change)="onSearchSupplierChange($event)" [virtualScroll]="true">
    <ng-template ng-option-tmp let-item="item" let-search="searchTerm">
      <div class="d-flex justify-content-between">
        <span>{{item.Id}}.{{item.SubId}} - {{item.BusinessName}}</span>
        <span>
          <fa-icon [icon]="['fas','ban']" *ngIf="item.disabled" style="color: red;"></fa-icon>
        </span>
      </div>
    </ng-template>
  </ng-select>
  `,
  styles: [``]
})
export class SearchSupplierComponent implements OnInit {
  @ViewChild('searchSupplier') searchSupplier: NgSelectComponent;
  @Output() selectSupplier: EventEmitter<SupplierModel> = new EventEmitter();

  supplierSearch$: Observable<SupplierModel[]>;
  supplierInput$ = new Subject<string>();

  constructor(private supplierService: SupplierService) { }

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
      // const IdParent = e?.IdParent || e?.Id;
      // this.router.navigateByUrl(`/Home/OrdineCliente/${e?.Id}/${IdParent}`);
      this.selectSupplier.emit(e);
    }
  }

}

