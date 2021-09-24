import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupplierModel } from 'src/app/core/component/supplier/model/supplier';
import { SupplierService } from 'src/app/core/component/supplier/service/supplier.service';
import { SupplierAgreementModel, SupplierDiscountLine } from './../../../../core/component/supplier/model/supplierAgreement';
import { SupplierCrossModel } from './../../../../core/component/supplier/model/supplierCross';

function PcValidator(frm: FormGroup): { [key: string]: any } {
  if (frm) {
    if (frm.controls.PcDiscountHeader.value || frm.controls.PcDiscountPremia.value) return null
  }
  return {
    error: {
      value: 'una delle due percentuali deve essere valorizzate'
    }
  };
}

@Component({
  selector: 'app-cross-line-modal',
  templateUrl: './cross-line-modal.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrossLineModalComponent implements OnInit {
  @ViewChild('searchDiscountLine', { static: true }) searchDiscountLine: NgSelectComponent;
  @Input() yearCross: number;
  @Input() supplierModel: SupplierModel;
  @Input() supplierCrossModel: SupplierCrossModel;

  supplierDiscounLine$: Observable<SupplierDiscountLine[]> | null;

  frmCrossLine = this.fb.group({
    Supplier: [null, Validators.required],
    DiscountLine: [null, Validators.required],
    Year: [null, Validators.required],
    PcDiscountHeader: [null,],
    PcDiscountPremia: [null,]
  }, { validator: PcValidator })

  constructor(public activeModal: NgbActiveModal
    , private suppplierService: SupplierService
    , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.frmCrossLine.patchValue(this.supplierCrossModel);
    this.frmCrossLine.controls.Year.patchValue(this.yearCross);
  }

  onClickResetCrossLine(e: Event) { }

  selectSupplierClick(e: SupplierModel) {
    //this.frmCrossLine.controls.DiscountLine.reset();
    const supplier = this.frmCrossLine.controls.Supplier.value;
    this.supplierDiscounLine$ = this.suppplierService.GetLineBySupplierYear({
      pId: supplier.Id,
      pSubId: supplier.SubId,
      pYear: this.frmCrossLine.controls.Year.value
    });
  }

  clearSupplierClick(e: any) {
    this.frmCrossLine.controls.DiscountLine.reset();
    this.frmCrossLine.controls.PcDiscountHeader.reset();
    this.supplierDiscounLine$ = of([]);
  }

  onChangeDiscountLine(e: any) {
    if (!e) return;
    const supplier = this.frmCrossLine.controls.Supplier.value;
    const hac$ = this.suppplierService.HeaderAgreementCollection({
      pId: supplier.Id,
      pSubId: supplier.SubId,
      pYear: this.frmCrossLine.controls.Year.value
    }).pipe(
      map((sam: SupplierAgreementModel[]) => sam.filter(s => s.TyLine === e.TyDiscountLine)[0])
    );
    const pac$ = this.suppplierService.PremiaAgreementCollection({
      pId: supplier.Id,
      pSubId: supplier.SubId,
      pYear: this.frmCrossLine.controls.Year.value
    }).pipe(
      map((sam: SupplierAgreementModel[]) => sam.filter(s => s.TyLine === e.TyDiscountLine)[0])
    );

    forkJoin({ hac: hac$, pac: pac$ })
      .subscribe(({ hac, pac }) => {
        this.frmCrossLine.controls.PcDiscountHeader.patchValue(hac?.Pc.toFixed(2))
        this.frmCrossLine.controls.PcDiscountPremia.patchValue(pac?.Pc.toFixed(2))
      }
      )
  }
}
