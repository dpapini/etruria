import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/core/component/user/model/userModel';
import { RequestSearchModel, TYPEREQUEST } from '../request/request';
import { logout } from '../store/login/login.actions';
import { AppState } from './../../../app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  @Input() user: UserModel;
  @Input() userId: string;
  @Output() humbergerClick: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppState>
    , private router: Router
  ) { }

  ngOnDestroy(): void { }

  ngOnInit(): void {
    // controllo se ci sono richieste fatte dalla user di estrazioni massive
    const etruriaRequestSearch: RequestSearchModel = { pTyRequest: TYPEREQUEST.BENCHMARKXLSX }
  }

  toggler(e: Event) {
    e.preventDefault();
    this.collapsed = !this.collapsed;
    this.humbergerClick.emit(!this.collapsed);
    localStorage.setItem('EtruriaLayout', JSON.stringify(this.collapsed));
  }

  viewProfile(e: Event) {
    e.preventDefault();
    this.router.navigate(['/Home/User/Profile']);
  }

  signOut(e: Event) {
    e.preventDefault();
    this.store.dispatch(logout())
  }
}
