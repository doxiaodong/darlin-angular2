import {Control} from '@angular/common';

export default class SignModalValidators {

  static checkUsername(c: Control): { [key: string]: boolean } {
    let usernamePattern = /^[^_]\w{5,39}$/;

    if (!usernamePattern.test(c.value)) {
      return {
        'username_error': true
      };
    }
    return null;
  }

  static checkPassword(c: Control) {
    let passwordPattern = /^\w{6,40}$/;

    if (!passwordPattern.test(c.value)) {
      return {
        'password_error': true
      };
    }
    return null;
  }

  static confirmPassword(c: Control, password: string) {
    if (password !== c.value) {
      return {
        'password_not_same': true
      };
    }
    return null;
  }


  constructor() {

  }

}
