import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  collapsedSidebar = false;
  constructor(private router: Router) {

    this.collapsedSidebar = (localStorage.getItem('EtruriaLayout')) ? JSON.parse(localStorage.getItem('EtruriaLayout')) : !window.innerWidth;
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      v => {
        (v instanceof NavigationEnd) ? this.collapsedSidebar = true : null;
        localStorage.setItem('EtruriaLayout', 'true');
      });
  }

  humbergerClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
  sidebarToggleClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
}
