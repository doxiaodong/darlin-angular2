export class HttpUtilsService {

  static paramPostBody(obj: Object):string {
    var str: Array<string> = [];
    for(var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }

    return str.join('&');
  }

  constructor() {
  }

}
