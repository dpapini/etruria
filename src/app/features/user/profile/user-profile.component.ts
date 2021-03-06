import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.module';
import { getUserModel } from 'src/app/core/component/store/login/login.selectors';
import { toastFailure } from 'src/app/core/component/store/toaster/toaster.actions';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { addPhoto, changePassword, deletePhoto } from '../../../core/component/store/login/login.actions';

function ConfirmPasswordValidator(control: AbstractControl): { [key: string]: any } {
  if (!control.parent) { return null; }
  if (control.value !== control.parent.get('PswNew').value) {
    return { DifferentPassword: { value: 'Le password non coincidono' } };
  }
  return null;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-profile.component.html',
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
export class UserProfileComponent implements OnInit {
  frmUserProfile: FormGroup;
  frmUserProfileContact: FormGroup;
  userModel: UserModel;
  user$: Observable<UserModel> = this.store.pipe(select(getUserModel))
  defaultPhoto = './../../../../assets/blank.png';

  private route$ = this.route.params.pipe(map(p => p));

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmUserProfile.controls;
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
    this.frmUserProfile = this.fb.group({
      Id: [this.userModel?.Id],
      Psw: [null, Validators.required],
      PswNew: [null, Validators.required],
      PswNewConfirm: [null, [Validators.required, ConfirmPasswordValidator]],
      Photo: [null],
    })
    this.frmUserProfileContact = this.fb.group({
      Contact: [this.userModel?.Contact],
    })
  }

  ngOnInit(): void {
    this.user$.
      subscribe((u: UserModel) => {
        this.userModel = u;
        this.frmUserProfile.patchValue(u);
        if (!u.Photo) this.frmUserProfile.controls.Photo.patchValue(this.defaultPhoto);
        this.frmUserProfileContact.controls.Contact.patchValue(u.Contact);
      })
  }

  btnSalvaOnClick(e: Event) {
    e.preventDefault();
    this.store.dispatch(changePassword(this.frmUserProfile.getRawValue()))
  }


  btnAnnullaOnClick(e: Event) {
    e.preventDefault();
    this.router.navigate(['/Home'], { relativeTo: this.route.parent });
  }

  addPhotoProfile(e: any) {
    const f = e.target.files[0];
    if (f) {
      if (f.size > 1048576) {
        this.store.dispatch(toastFailure({ title: null, message: 'Attenzione. Immagine maggiore di 1 MB' }))
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(f); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.frmUserProfile.controls.Photo.patchValue(event.target.result);
        this.store.dispatch(addPhoto({ id: this.frmUserProfile.controls.Id.value, photo: event.target.result.toString() }))
      }
    }
  }
  deletePhotoProfile() {
    this.frmUserProfile.controls.Photo.patchValue(this.defaultPhoto);
    this.store.dispatch(deletePhoto({ id: this.frmUserProfile.controls.Id.value }));
  }
}
