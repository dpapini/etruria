import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.module';
import { clearDataSupplier } from './features/supplier/store/supplier.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'etruria';
  constructor(private store: Store<AppState>) { }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event) {
    console.log('unload prima di cleardata')
    this.store.dispatch(clearDataSupplier());
  }
}
