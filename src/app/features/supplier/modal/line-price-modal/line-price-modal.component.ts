import { map, shareReplay } from 'rxjs/operators';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LinePriceModel } from 'src/app/core/component/supplier/model/linePrice';

@Component({
  selector: 'app-line-price-modal',
  templateUrl: './line-price-modal.component.html',
  styles: [``]
})
export class LinePriceModalComponent implements OnInit {

  linePrice$: Observable<LinePriceModel[]> = this.supplierService.LinePriceCollection().pipe(shareReplay(1));
  frmLinePrice: FormGroup;

  get FiltroCollection() { return this.frmLinePrice.controls.LinePriceCollection as FormArray }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private supplierService: SupplierService) {
    this.frmLinePrice = this.fb.group({
      LinePriceCollection: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.linePrice$.subscribe(
      lp => lp.map(value => {
        const f = this.frmLinePrice.controls.LinePriceCollection as FormArray;
        f.push(this.createFiltroRow(value));
      })
    )
  }

  onClickResetLinePrice(e: Event) {

  }
  createFiltroRow(lp?: LinePriceModel): FormGroup {
    return this.fb.group({
      Id: [lp?.Id],
      Label: [lp?.Label],
      Checked: [lp?.Id === 3 || lp?.Id === 4 || lp?.Id === 91 || lp?.Id === 5 || lp?.Id === 70 ? false : true]
    });
  }

  getFiltroFormGroup(index): FormGroup {
    return this.FiltroCollection.controls[index] as FormGroup;
  }
}
