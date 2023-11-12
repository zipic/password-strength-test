import { Injectable } from '@angular/core';
import { ValidatonType } from '../model/validation-type';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() {

   }

   validation(password: string): ValidatonType {
    const length = password.length;
    const onlyNumbers = /[0-9]/.test(password);
    const onlyLetters = /[a-z]/.test(password);
    const onlySymbols = /[!@#$%^&*(),.?":{}|<>+=-_]/.test(password);

    const passwordLeastEight = length < 8;

    let passwordIsEasy, passwordIsMedium, passwordIsStrong;

    passwordIsStrong = onlyNumbers && onlySymbols && onlyLetters && !passwordLeastEight;

    if (!passwordIsStrong) {
      passwordIsEasy = (onlyNumbers || onlyLetters || onlySymbols)
      || passwordLeastEight;
    } else {
      passwordIsEasy = false;
    }

      if (!passwordIsStrong && !passwordLeastEight) {
        passwordIsMedium = (onlyLetters && onlySymbols) ||
        (onlyNumbers && onlyLetters) ||
        (onlyNumbers && onlySymbols);
      } else {
        passwordIsMedium = false;
      }

    return {
      easy: passwordIsEasy,
      medium: passwordIsMedium ,
      strong: passwordIsStrong,
      leastEight: passwordLeastEight
    }
  }
}
