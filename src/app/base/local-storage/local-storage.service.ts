export class LocalStorageService {

  private localStorage: any;

  private sessionStorage: any;

  private prefix: string = '';

  save(key: string, value: string) {
    this.localStorage.setItem(this.prefix + key, value);
  }

  get(key: string) {
    return this.localStorage.getItem(this.prefix + key);
  }

  remove(key: string) {
    this.localStorage.removeItem(this.prefix + key);
  }

  saveSession(key: string, value: string) {
    this.sessionStorage.setItem(this.prefix + key, value);
  }

  getSession(key: string) {
    return this.sessionStorage.getItem(this.prefix + key);
  }

  removeSession(key: string) {
    this.sessionStorage.removeItem(this.prefix + key);
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

}
