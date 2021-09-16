import { getFilterContactParam } from './store/filter.selectors';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit, AfterViewChecked {

  filterContact$ = this.store.select(getFilterContactParam);

  constructor(private router: Router,
    private store: Store,
    public route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
  }

  onClickContactAdd(e: Event) {
    e.preventDefault();
    this.router.navigate(['Detail'], { relativeTo: this.route });
  }


}
