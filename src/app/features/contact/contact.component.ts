import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit, AfterViewChecked {

  constructor(private router: Router, public route: ActivatedRoute,
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
