import { Directive, OnDestroy, ElementRef, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[setLowerCase]'
})
export class SetLowerCaseDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef, private formControlName: FormControlName) { }

  ngOnInit(): void {
    this.formControlName.valueChanges.subscribe(value => this.el.nativeElement.value = value.toLowerCase());
  }

  ngOnDestroy(): void {

  }

}
