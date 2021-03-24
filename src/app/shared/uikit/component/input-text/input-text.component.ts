import { Component, forwardRef, Injector, Input, OnInit, ChangeDetectorRef, AfterViewChecked, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dp-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputTextComponent implements ControlValueAccessor, OnInit, AfterViewChecked {
  @ViewChild('inputText') inputText: ElementRef;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() invalidIfDirtyOrTouched: boolean;
  @Input() required: boolean = false;
  @Input() btnClear: boolean = false;
  @Input() readonly: boolean = false;

  value: string = null;
  ngControl: NgControl;

  onTouched: any = () => { };
  onChanged: any = (val) => { };

  constructor(
    private inj: Injector,
    private cdref: ChangeDetectorRef,
  ) {

  }

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
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (!this.inputText) return;
    this.inputText.nativeElement.disabled = isDisabled;
    this.onChanged(this.value);
  }
  onChangeHandler(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChanged(this.value);
  }
  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }
  onClickClear(e: Event) {
    this.value = '';
    this.onChanged(this.value);
  }
}
