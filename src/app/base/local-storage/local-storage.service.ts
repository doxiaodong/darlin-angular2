export class LocalStorageService {

  private localStorage: any;

  private prefix: string = '';

  save(key: string, value: any) {
    this.localStorage.setItem(this.prefix + key, value);
  }

  get(key: string) {
    return this.localStorage.getItem(this.prefix + key);
  }

  remove(key: string) {
    this.localStorage.removeItem(this.prefix + key);
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  constructor() {
    this.localStorage = window.localStorage;
  }

}
