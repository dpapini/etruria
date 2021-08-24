import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-filter',
  template: `
  <form [formGroup]="frmCustomerFilter" (ngSubmit)="onSubmit($event)" class='h-100'>
    <div class="card h-100" style="border: 0;">
      <div class="card-header">
        <h6> Filtri </h6>
      </div>
      <div class="card-body">
        <div class="col-12">
          <dp-input-number placeholder="Id. Cliente" label="Id. Cliente" formControlName="pId"></dp-input-number>
        </div>
        <div class="col-12">
          <dp-input-text formControlName="pLabel" placeholder="Anagrafica" label="Anagrafica" btnClear="true">
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
      </div>
      <div class="card-footer d-flex ">
        <button type="button" class="btn btn-warning btn-sm mr-1 mr-auto" (click)="onResetOnClick($event)">Reset</button>
        <button type="button" class="btn btn-secondary btn-sm mr-1" (click)="btnAbortOnClikc($event)">Annulla</button>
        <button type="submit" (keydown.enter)="$event.preventDefault()"
          class="btn btn-primary btn-sm">Applica</button>
      </div>
    </div>
  </form>
`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFilterComponent implements OnInit {
  @Output() onFilterClick: EventEmitter<any> = new EventEmitter();

  frmCustomerFilter: FormGroup
  constructor(private fb: FormBuilder, private router: Router) {
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
    this.onFilterClick.emit({ filterPanel: false, data: null });
    this.router.navigateByUrl('/Home/Customer');
  }

  onResetOnClick(e: Event) {
    e.preventDefault();
    this.onFilterClick.emit({ filterPanel: false, data: null, reset: true })
  }

  onSubmit(e: Event) {
    this.onFilterClick.emit({ filterPanel: false, data: this.frmCustomerFilter.getRawValue(), reset: false })
  }
}
