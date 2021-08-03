import { toastSuccess, toastWarning, toastFailure } from './toaster.actsions';
import { Action, createReducer, on } from '@ngrx/store';
export interface ToastState {
   title: string;
   message: string;
}
export const initializeToastState: ToastState = { title: '', message: '' };
const reducerInternal = createReducer(
   initializeToastState,
   on(toastSuccess, (state, action) => { return state }),
   on(toastWarning, (state, action) => { return state }),
   on(toastFailure, (state, action) => { return state }),
);

export function ToastReducer(state: ToastState | undefined, action: Action) {
   return reducerInternal(state, action);
}