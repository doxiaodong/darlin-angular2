export class LoadingService {

  static isLoading: boolean = false;

  static timeoutShow: any = null;
  static timeoutHide: any = null;

  static loadingNum: number = 0;

  static show(delay: number = 200) {
    this.loadingNum++;
    this._show(delay);
  }

  static hide(delay: number = 500) {
    this.loadingNum--;
    if (this.loadingNum <= 0) {
      this.loadingNum = 0;
      this._hide(delay);
    }
  }

  static _show(delay) {
    if (this.timeoutHide) {
      clearTimeout(this.timeoutHide);
    }
    this.timeoutShow = setTimeout(() => {
      if (this.loadingNum > 0) {
        this.isLoading = true;
      }
    }, delay);
  }

  static _hide(delay) {
    if (this.timeoutShow) {
      clearTimeout(this.timeoutShow);
    }
    this.timeoutHide = setTimeout(() => {
      this.isLoading = false;
    }, delay);
  }

}
