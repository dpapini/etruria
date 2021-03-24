import { Directive, OnDestroy, ElementRef, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[setLabelView]'
})
export class SetLabelViewDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef, private formControlName: FormControlName) { }

  ngOnInit(): void {
    this.formControlName.valueChanges.subscribe(value => {
      const inputId = this.el.nativeElement.getAttribute('formControlName');
      const label = document.querySelector('label[for="' + inputId + '"]');
      if (label) {
        label.removeAttribute('class');
        if (!value) { }
        else { label.classList.add('visible'); }
      } else {
        label.classList.add('invisible');
      }
    }
    );
  }

  ngOnDestroy(): void {

  }

}
