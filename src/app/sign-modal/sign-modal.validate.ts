import {FormControl} from '@angular/forms';

export default class SignModalValidators {

  static checkUsername(c: FormControl): { [key: string]: boolean } {
    let usernamePattern = /^[^_]\w{5,39}$/;

    if (!usernamePattern.test(c.value)) {
      return {
        'username_error': true
      };
    }
    return null;
  }

  static checkPassword(c: FormControl) {
    let passwordPattern = /^\w{6,40}$/;

    if (!passwordPattern.test(c.value)) {
      return {
        'password_error': true
      };
    }
    return null;
  }

  static confirmPassword(c: FormControl, password: string) {
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
