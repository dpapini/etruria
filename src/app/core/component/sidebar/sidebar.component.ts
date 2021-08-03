import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { MenuModel } from './model/menuModel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class SidebarComponent implements OnInit {
  @Input() menu: MenuModel;
  @Output() sidebarToggleClick: EventEmitter<any> = new EventEmitter();

  d: MenuModel;
  public isCollapsed: boolean[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.d = {
      Id: 0,
      Label: 'DashBoard',
      IcoName: 'home',
      Path: '/Home/Dashboard',
    }
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
