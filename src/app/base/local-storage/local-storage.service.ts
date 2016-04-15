export class LocalStorageService {

  static localStorage: any = window.localStorage;

  static sessionStorage: any = window.sessionStorage;

  static prefix: string = '';

  static save(key: string, value: string) {
    this.localStorage.setItem(this.prefix + key, value);
  }

  static get(key: string) {
    return this.localStorage.getItem(this.prefix + key);
  }

  static remove(key: string) {
    this.localStorage.removeItem(this.prefix + key);
  }

  static saveSession(key: string, value: string) {
    this.sessionStorage.setItem(this.prefix + key, value);
  }

  static getSession(key: string) {
    return this.sessionStorage.getItem(this.prefix + key);
  }

  static removeSession(key: string) {
    this.sessionStorage.removeItem(this.prefix + key);
  }

  static setPrefix(prefix: string) {
    this.prefix = prefix;
  }

}
