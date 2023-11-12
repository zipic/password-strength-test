  import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
  import { ValidatonType } from 'src/app/model/validation-type';
  import { PasswordService } from 'src/app/service/password.service';

  @Component({
    selector: 'app-password-validation',
    templateUrl: './password-validation.component.html',
    styleUrls: ['./password-validation.component.scss']
  })
  export class PasswordValidationComponent implements OnChanges {
    @Input() password: string = '';

    passwordValidation: ValidatonType = {
      easy: false,
      medium: false,
      strong: false,
      leastEight: false
    };

    constructor(private passwordService: PasswordService) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['password']) {
        this.passwordChange(this.password);
      }
    }

    passwordChange(value: string) {
      if (value.trim().length === 0) {
        this.passwordValidation = {
          easy: false,
          medium: false,
          strong: false,
          leastEight: false
        };
      } else {
        this.passwordValidation = this.passwordService.validation(value.toLowerCase());
      }
    }

    getPasswordClass(type: string) {
      switch (type) {
        case 'easy':
          return { 'danger': this.passwordValidation.easy, 'medium': this.passwordValidation.medium, 'strong': this.passwordValidation.strong };
        case 'medium':
          return { 'danger': this.passwordValidation.leastEight, 'medium': this.passwordValidation.medium, 'strong': this.passwordValidation.strong };
        case 'strong':
          return { 'strong': this.passwordValidation.strong, 'danger': this.passwordValidation.leastEight };
        default:
          return {};
      }
    }
  }
