import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactSearch } from 'src/app/core/component/contact/model/contactModel';
import { DContactSearch } from 'src/app/core/component/contact/model/dcontactModel';
import { DcontactService } from 'src/app/core/component/contact/service/dcontact.service';

@Component({
  selector: 'dp-contatto-filter',
  template: `
  <form (ngSubmit)="onSubmit($event)" [formGroup]="frmContactSearch" class="h-100">
    <div class="card h-100" style="border: 0;">
      <div class="card-header">
        <h6> Filtri </h6>
      </div>
      <div class="card-body">
        <div class="col-12">
          <dp-input-number placeholder="Id. Contatto" label="Id. Contatto" #inputIdSearch formControlName="pId">
          </dp-input-number>
        </div>
        <div class="col-12">
          <dp-input-text formControlName="pBusinessName" placeholder="Anagrafica" label="Anagrafica" btnClear="true">
          </dp-input-text>
        </div>
        <div class="col-12">
          <dp-input-text formControlName="pCdFiscale" placeholder="Cd. Fiscale" label="Cd. Fiscale" btnClear="true">
          </dp-input-text>
        </div>
        <div class="col-12">
          <dp-input-text formControlName="pPartitaIva" placeholder="Partita Iva" label="Partita Iva" btnClear="true">
          </dp-input-text>
        </div>
        <div class="col-12">
          <label for="pTyContatto"
            [ngClass]="frmContactSearch.get('pTyContact').value===null || frmContactSearch.get('pTyContact').value?.length===0?'invisible':'visible'">
            Tipologia Contatto</label>
          <ng-select #selectDContact [items]="dcontact$|async" bindLabel="Testo" bindValue="Id" class="ng-select-small"
            dropdownPosition="auto" labelForId="pTyContact" placeholder="Tipologia Contatto" [openOnEnter]=false
            appendTo="body" [virtualScroll]="true" formControlName="pTyContact">
            <ng-template ng-option-tmp let-item="item" let-search="searchTerm">
              <div>
                <span>{{item.Testo}}</span>
              </div>
            </ng-template>
          </ng-select>
        </div>
      </div>
      <div class="card-footer d-flex ">
        <button type="button" class="btn btn-warning btn-sm mr-1 mr-auto" (click)="onReset($event)">Reset</button>
        <button type="button" class="btn btn-secondary btn-sm mr-1" (click)="onAbort($event)">Annulla</button>
        <button [disabled]="frmContactSearch.invalid" type="submit" (keydown.enter)="$event.preventDefault()"
          class="btn btn-primary btn-sm">Applica</button>
      </div>
    </div>
  </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFilterComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('inputIdSearch', { read: ElementRef }) inputIdSearch: ElementRef;
  @Input() filterContact: ContactSearch;
  @Output() onFilterClick: EventEmitter<any> = new EventEmitter();

  frmContactSearch: FormGroup;
  dcontact$ = this.dcontactService.DContactCollection({ pId: null, pTesto: '' } as DContactSearch);

  constructor(private fb: FormBuilder,
    private dcontactService: DcontactService,) {

    this.frmContactSearch = this.fb.group({
      pId: [''],
      pBusinessName: [''],
      pCdFiscale: [''],
      pPartitaIva: [''],
      pTyContact: [null],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { filterContact } = changes;

    if (filterContact && filterContact.currentValue) {
      this.frmContactSearch.patchValue(filterContact.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.inputIdSearch?.nativeElement.querySelector('input').focus();
  }

  ngOnInit(): void { }

  onSubmit(e: Event) {
    this.onFilterClick.emit({ filterPanel: false, data: this.frmContactSearch.getRawValue(), reset: false })
  }

  onAbort(e: Event) {
    e.preventDefault();
    this.onFilterClick.emit({ filterPanel: false, data: null, reset: false })
  }

  onReset(e: Event) {
    e.preventDefault();
    this.onFilterClick.emit({ filterPanel: false, data: null, reset: true })
  }
}

