
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';

export class TeknoHandleError implements ErrorHandler {
   handleError(error: HttpErrorResponse) {
      this.set(error);
   }

   set(error: HttpErrorResponse) {
      let erroMessage: string;
      if (error.error instanceof ErrorEvent) {
         // A client-side or network error occurred. Handle it accordingly.
         erroMessage = 'An error occurred:' + error.error.message;
      } else {
         // The backend returned an unsuccessful response code.
         // The response body may contain clues as to what went wrong,
         erroMessage = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
      }
      console.log(error);
      console.error(erroMessage);
      // return an observable with a user-facing error message
      return throwError(error);
   }
}
