import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const PASSWORD_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [PASSWORD_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor {

  passwordForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  private createForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('')
    })
  }

  get passwordControl(): FormControl {
    return this.passwordForm.get('password') as FormControl;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    if (value !== null && value !== undefined) {
      this.passwordForm.get('password')?.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
