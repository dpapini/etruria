import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { login } from '../component/store/login/login.actions';
import { getShowError } from '../component/store/login/login.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  showError$: Observable<boolean> = this.store.pipe(select(getShowError));
  fieldTextType = false;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>) {

    this.frmLogin = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });

  }

  ngOnInit(): void { }

  onSubmit(event: Event) {
    this.store.dispatch(
      login(this.frmLogin.value)
    );
  }

  onClickShowHidePassword(e: Event) {
    e.preventDefault();
    this.fieldTextType = !this.fieldTextType;
  }

}
