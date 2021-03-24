import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.module';
import { getMenu } from '../../login/store/login.selectors';
import { MenuModel } from './model/menuModel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class SidebarComponent implements OnInit {
  @Output() sidebarToggleClick: EventEmitter<any> = new EventEmitter();
  menu$: Observable<MenuModel> = this.store.pipe(select(getMenu));

  d: MenuModel;
  public isCollapsed: boolean[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.d = new MenuModel();
    this.d.Id = 0;
    this.d.Label = 'DashBoard';
    this.d.IcoName = 'home';
    this.d.Path = '/Home/Dashboard';
  }

  toggle(id: number) {
    if (this.isCollapsed[id] == null) {
      return this.isCollapsed[id] = false;
    }
    return this.isCollapsed[id] = !this.isCollapsed[id];
  }

  mobileToggleClick(e) {
    e.preventDefault();
    this.sidebarToggleClick.emit(false);
  }
}
