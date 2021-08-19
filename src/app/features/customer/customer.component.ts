import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [``]
})
export class CustomerComponent implements OnInit {

  constructor(private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onClickCustomerAdd(e: Event) { }
}
