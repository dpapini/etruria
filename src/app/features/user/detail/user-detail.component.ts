import { editUser } from '../../../core/component/store/user/user.actions';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { ContactModel } from 'src/app/core/component/contact/model/contactModel';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { getUserById } from 'src/app/core/component/store/user/user.selectors';

function ConfirmPasswordValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }
  if (control.value !== null && control.parent.get('Psw').value === null) {
    return { DifferentPassword: { value: 'Password attuale mancante o le password non coincidono' } };
  }
  if (control.value !== control.parent.get('PswNew').value) {
    return {
      DifferentPassword: {
        value: 'Password attuale mancante o le password non coincidono'
      }
    };
  }
  return null;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [`
  .symbol {
    display: inline-block;
    flex-shrink: 0;
    position: relative;
    border-radius: .42rem;
  }
  .symbol-label {
    width: 100px;
    height: 100px;
  }
  .profile-usertitle-name {
      color: #5a7391;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 7px;
  }
  .profile-usertitle-job {
      text-transform: uppercase;
      color: #5b9bd1;
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 7px;
  }
  .image-input, .image-input .image-input-wrapper {
    border-radius: .42rem;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .image-input {
      position: relative;
      display: inline-block;
  }
  .text-muted {
      color: #b5b5c3!important;
  }
  .icon-sm {
    font-size: .75rem!important;
  }
  .btn.btn-white.btn-shadow {
    box-shadow: 0 9px 16px 0 rgba(24,28,50,.25)!important;
  }
  .btn.btn-icon.btn-circle {
      border-radius: 50%;
  }
  .btn.btn-icon.btn-xs {
      height: 24px;
      width: 24px;
  }
  .btn:not(:disabled):not(.disabled) {
      cursor: pointer;
  }
  .image-input [data-action=change] {
      cursor: pointer;
      position: absolute;
      right: -10px;
      top: -10px;
  }
  .btn.btn-white {
      color: #3f4254;
      background-color: #fff;
      border-color: #fff;
  }
  .btn.btn-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      height: calc(1.5em + 1.3rem + 2px);
      width: calc(1.5em + 1.3rem + 2px);
  }
  .btn:not(.btn-text) {
      cursor: pointer;
  }
  .image-input [data-action=change] input {
    width: 0!important;
    height: 0!important;
    overflow: hidden;
    opacity: 0;
}

`]
})
export class UserDetailComponent implements OnInit {
  frmUserDetail: FormGroup;
  userModel: UserModel;

  private route$ = this.route.params.pipe(map(p => p));

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmUserDetail.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  constructor(private fb: FormBuilder, private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.frmUserDetail = this.fb.group({
      Id: [this.userModel?.Id],
      IdContact: [this.userModel?.IdContact, Validators.required],
      IdRole: [this.userModel?.IdRole],
      IdState: [this.userModel?.IdState],
      Role: this.fb.group({
        Id: [this.userModel?.Role?.Id],
        Label: [this.userModel?.Role?.Label],
      }),
      State: this.fb.group({
        Id: [this.userModel?.Role?.Id],
        Label: [this.userModel?.Role?.Label],
      }),
      Contact: [this.userModel?.Contact],
      Psw: [this.userModel?.Psw],
      PswNew: [this.userModel?.PswNew],
      PswNewConfirm: [this.userModel?.PswNewConfirm, [ConfirmPasswordValidator]],
    })
  }

  ngOnInit(): void {
    this.route$.pipe(
      filter(p => p !== null && p.Id !== null),
      switchMap(p => this.store.pipe(select(getUserById(+p.Id))))).
      subscribe((u: UserModel) => {
        this.userModel = u;
        this.frmUserDetail.patchValue(u);
      })
  }

  btnSalvaOnClick(e: Event) {
    e.preventDefault();
    console.log('salva', this.frmUserDetail.getRawValue())
    this.store.dispatch(editUser({ userModel: this.frmUserDetail.getRawValue() }));
  }

  btnAnnullaOnClick(e: Event) {
    e.preventDefault();
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }

  gridClicked(cm: Observable<ContactModel>) {
    cm.subscribe(c => {
      this.frmUserDetail.controls.Contact.patchValue(c);
      this.frmUserDetail.controls.IdContact.patchValue(c.Id);
    })
  }
}
