export class LoadingService {

  static isLoading: boolean = false;

  static timeout: any = null;

  static loadingNum: number = 0;

  static show() {
    this.loadingNum++;
    this._show();
  }

  static hide(delay: number=500) {
    this.loadingNum--;
    if (this.loadingNum <= 0) {
      this.loadingNum = 0;
      this._hide(delay);
    }
  }

  static _show() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.isLoading = true;
  }

  static _hide(delay) {
    setTimeout(() => {
      this.isLoading = false;
    }, delay);
  }

}
