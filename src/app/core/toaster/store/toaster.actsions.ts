import { createAction, props } from "@ngrx/store";

export enum CarrelloActionTypes {
   TOAST_SUCCESS = '[toast] Success',
   TOAST_WARNING = '[toast] Warning',
   TOAST_FAILURE = '[toast] Failure',
}

export const toastSuccess = createAction(
   CarrelloActionTypes.TOAST_SUCCESS,
   props<{ title: string, message: string }>()
);
export const toastWarning = createAction(
   CarrelloActionTypes.TOAST_WARNING,
   props<{ title: string, message: string }>()
);
export const toastFailure = createAction(
   CarrelloActionTypes.TOAST_FAILURE,
   props<{ title: string, message: string }>()
);
