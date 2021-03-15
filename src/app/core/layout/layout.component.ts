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

    this.collapsedSidebar = (localStorage.getItem('TeknoLayout')) ? JSON.parse(localStorage.getItem('TeknoLayout')) : !window.innerWidth;
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      v => {
        (v instanceof NavigationEnd) ? this.collapsedSidebar = true : null;
        localStorage.setItem('TeknoLayout', 'true');
      });
  }

  humbergerClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
  sidebarToggleClick(v: any) {
    this.collapsedSidebar = !this.collapsedSidebar;
  }
}
