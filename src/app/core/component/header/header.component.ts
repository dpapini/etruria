import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from '../../login/store/login.actions';
import { getUserId, getUserModel } from '../../login/store/login.selectors';
import { AppState } from './../../../app.module';
import { UserModel } from './../user/model/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  @Output() humbergerClick: EventEmitter<any> = new EventEmitter();
  user$: Observable<UserModel> = this.store.pipe(select(getUserModel));
  userId$: Observable<string> = this.store.pipe(select(getUserId));

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void { }

  ngOnInit(): void { }

  toggler(e: Event) {
    e.preventDefault();
    this.collapsed = !this.collapsed;
    this.humbergerClick.emit(!this.collapsed);
    localStorage.setItem('TeknoLayout', JSON.stringify(this.collapsed));
  }

  viewProfile(e: Event) {
    e.preventDefault();
  }

  signOut(e: Event) {
    e.preventDefault();
    this.store.dispatch(logout())
  }
}
