import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ContactService } from "src/app/core/component/contact/service/contact.service";
import { filterContact, filterContactFailed, filterContactSuccess } from "./filter.actions";

@Injectable()
export class FilterContattoEffects {

  constructor(private actions$: Actions,
    private contactService: ContactService) {
  }

  doSearch$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(filterContact),
      switchMap(action => {
        return this.contactService.ContactCollection(action.cs).pipe(
          map(response => filterContactSuccess({ response })),
          catchError(() => of(filterContactFailed())
          )
        );
      })
    )
  );
}
