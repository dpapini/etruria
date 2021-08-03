import { toastSuccess, toastWarning, toastFailure } from './toaster.actsions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { tap } from 'rxjs/operators';


@Injectable()
export class ToastEffects {
   constructor(private actions$: Actions,
      private toastr: ToastrService) {
   }

   displaySuccess$ = createEffect(() => this.actions$.pipe(
      ofType(toastSuccess),
      tap(action => this.toastr.success(action.message, action.title, { timeOut: 3000 }))
   ), { dispatch: false });

   displayWarning$ = createEffect(() => this.actions$.pipe(
      ofType(toastWarning),
      tap(action => this.toastr.warning(action.message, action.title, { timeOut: 3000 }))
   ), { dispatch: false });

   displayFailure$ = createEffect(() => this.actions$.pipe(
      ofType(toastFailure),
      tap(action => this.toastr.error(action.message, action.title))
   ), { dispatch: false });
}
