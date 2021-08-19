
import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearDataSupplier } from './features/supplier/store/supplier.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'etruria';
  constructor(private store: Store) { }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event) {
    this.store.dispatch(clearDataSupplier());
  }
}
