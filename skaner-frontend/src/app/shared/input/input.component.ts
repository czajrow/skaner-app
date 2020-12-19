import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NOOP = () => {};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() type: 'text' | 'number' = 'text';
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() help: string;

  public _propagateChange: (val: any) => void = NOOP;
  private _propagateTouch: (val: any) => void = NOOP;
  public _isDisabled: boolean;
  public _value: any;

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  onChange(event): void {
    console.log(event);
    console.log(this._value);
    console.log(this._propagateChange);
  }
}
