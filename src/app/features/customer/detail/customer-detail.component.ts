import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(p => +p.Id > 0),
      switchMap((p: Params) => {
        const id: number = +p.Id;
        //chiamare il servizio per avere il dettaglio del cliente
        return of();
      })).subscribe(c => {
      }
      )
  }

}
