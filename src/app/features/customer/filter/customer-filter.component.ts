import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-filter',
  template: `
  <div class="card h-100" style="border: 0;">
    <div class="card-header">
      <h6> Filtri </h6>
    </div>
    <div class="card-body">
      <form [formGroup]="frmCustomerFilter">
        <div class="form-row">
          <div class="col-12">
            <dp-input-number placeholder="Id. Cliente" label="Id. Cliente" formControlName="pId"></dp-input-number>
          </div>
          <div class="col-12">
            <dp-input-text formControlName="pLabel" placeholder="Anagrafica" label="Anagrafica" btnClear="true">
            </dp-input-text>
          </div>
        </div>
        <div class="form-row">
          <div class="col-12">
            <dp-input-text formControlName="pCdFiscale" placeholder="Cd. Fiscale" label="Cd. Fiscale" btnClear="true">
            </dp-input-text>
          </div>
          <div class="col-12">
            <dp-input-text formControlName="pPartitaIva" placeholder="Partita Iva" label="Partita Iva" btnClear="true">
            </dp-input-text>
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <div>
        <button type="submit" class="btn btn-secondary btn-sm mr-1" (click)="btnAbortOnClikc($event)">Annulla</button>
        <button type="submit" class="btn btn-primary btn-sm" (click)="btnFilterOnClick($event)">Applica</button>
      </div>
    </div>
  </div>
`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFilterComponent implements OnInit {
  @Output() onFilterClick: EventEmitter<boolean> = new EventEmitter();

  frmCustomerFilter: FormGroup
  constructor(private fb: FormBuilder) {
    this.frmCustomerFilter = this.fb.group({
      pId: [null],
      pLabel: [null],
      pCdFiscale: [null],
      pPartitaIva: [null],
    });
  }

  ngOnInit(): void {
  }

  btnAbortOnClikc(e: Event) {
    e.preventDefault();
    this.onFilterClick.emit(false);
  }

  btnFilterOnClick(e: Event) {
    this.onFilterClick.emit(false);
  }
}
