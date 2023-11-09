import { Component } from '@angular/core';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.scss']
})
export class PasswordValidationComponent {
  password: string = '';
  passwordIsEasy: boolean = false;
  passwordIsMedium: boolean = false;
  passwordIsStrong: boolean = false;
  passwordLeastEight: boolean = false;

  checkPassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    if (this.password.trim().length === 0) {
      this.passwordIsEasy = false;
      this.passwordIsMedium = false;
      this.passwordIsStrong = false;
      this.passwordLeastEight = false;
    } else {
      this.validation();
    }
  }

  validation() {
    const length = this.password.length;
    const onlyNumbers = /[0-9]/.test(this.password);
    const onlyLetters = /[a-zA-Z]/.test(this.password);
    const onlySymbols = /[!@#$%^&*(),.?":{}|<>+=-]/.test(this.password);

    this.passwordLeastEight = length < 8;

    if (!this.passwordIsStrong) {
      this.passwordIsEasy = (onlyNumbers || onlyLetters || onlySymbols)
      || this.passwordLeastEight;
    } else {
      this.passwordIsEasy = false;
    }

      if (!this.passwordIsStrong) {
        this.passwordIsMedium = (onlyLetters && onlySymbols) ||
        (onlyNumbers && onlyLetters) ||
        (onlyNumbers && onlySymbols);
      } else {
        this.passwordIsMedium = false;
      }
    this.passwordIsStrong = (onlyNumbers && onlySymbols && onlyLetters);
  }
}
