import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, forwardRef, Injector, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dp-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputNumberComponent implements ControlValueAccessor, OnInit, AfterViewChecked {
  @ViewChild('inputNumber') inputNumber: ElementRef;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() invalidIfDirtyOrTouched: boolean;
  @Input() required: boolean;
  @Input() readonly: boolean;

  value: string = null;
  disabled = false;
  errors: any;
  ngControl: NgControl;
  r: boolean;

  onTouched: any = () => { };
  onChanged: any = (val) => { };

  constructor(
    private inj: Injector,
    private cdref: ChangeDetectorRef,
  ) { }

  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
    if (value === null || value === undefined) {
      this.value = null;
    }
  }
  setDisabledState(isDisabled: boolean): void {
    // this.inputNumber.nativeElement.disabled = isDisabled;
    this.disabled = isDisabled;
    this.onChanged();
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onChangeHandler(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChanged(this.value);
  }
  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }
}
