import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DRoleModel, DRoleSearch } from 'src/app/core/component/user/model/droleModel';
import { DRoleService } from 'src/app/core/component/user/service/drole.service';

function ConfirmPasswordValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }
  if (control.value !== control.parent.get('Psw').value) {
    return { DifferentPassword: { value: 'Le password non coincidono' } };
  }
  return null;
}


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styles: [``],
})
export class UserModalComponent implements OnInit, AfterViewChecked {
  droleCollection$: Observable<DRoleModel[]> | Observable<unknown> = this.droleService.DRoleCollection({} as DRoleSearch).pipe(shareReplay(1));
  frmUserAdd: FormGroup;

  constructor(private fb: FormBuilder, private cdref: ChangeDetectorRef,
    private droleService: DRoleService, public activeModal: NgbActiveModal) {
    this.frmUserAdd = this.fb.group({
      UserId: [null, Validators.required],
      Psw: [null, Validators.required],
      PswNewConfirm: [null, [Validators.required, ConfirmPasswordValidator]],
      IdRole: [null],
      DRole: this.fb.group({
        Id: [null],
        Label: [null],
      })
    });
  }
  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void { }

  onClickResetUserAdd(e: Event) {
    this.frmUserAdd.reset();
  }

  onChangeDrole(e) {
    this.frmUserAdd.controls.IdRole.patchValue(e.Id);
  }
}
