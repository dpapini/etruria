import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { getIdUser, getMenu, getUserId, getUserModel } from '../component/store/login/login.selectors';
import { getUsers } from '../component/store/user/user.actions';
import { getUserList } from '../component/store/user/user.selectors';
import { UserModel, UserSearch, UserTipologiaRicerca } from '../component/user/model/userModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [`
  `]
})
export class LayoutComponent implements OnInit {
  collapsedSidebar = false;
  user$: Observable<UserModel> = this.store.select(getUserModel);
  userId$: Observable<string> = this.store.pipe(select(getUserId), take(1));
  userList$ = this.store.select(getUserList);
  idUser$ = this.store.select(getIdUser);
  menu$ = this.store.select(getMenu);

  constructor(private router: Router, private store: Store) {
    this.collapsedSidebar = (localStorage.getItem('EtruriaLayout')) ? JSON.parse(localStorage.getItem('EtruriaLayout')) : !window.innerWidth;
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      v => {
        (v instanceof NavigationEnd) ? this.collapsedSidebar = true : null;
        localStorage.setItem('EtruriaLayout', 'true');
      });

    const userSearch: UserSearch = { pTyRicerca: UserTipologiaRicerca.RICERCA };
    this.store.dispatch(getUsers({ userSearch }));
  }

  humbergerClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
  sidebarToggleClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }

}
