import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { tap } from 'rxjs/operators';
import { toastFailure, toastSuccess, toastSuccessReload, toastWarning } from './toaster.actions';


@Injectable()
export class ToastEffects {
  constructor(private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
  }

  displaySuccess$ = createEffect(() => this.actions$.pipe(
    ofType(toastSuccess),
    tap(action => this.toastr.success(action.message, action.title, { timeOut: 3000 }))
  ), { dispatch: false });

  displaySuccessReload$ = createEffect(() => this.actions$.pipe(
    ofType(toastSuccessReload),
    tap(action => this.toastr.success(action.message, action.title, { timeOut: 3000 })
      .onHidden.subscribe(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url], { relativeTo: this.route });
      }))
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
