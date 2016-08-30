export class HttpUtilsService {

  static paramPostBody(obj: Object): string {
    let str: Array<string> = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    }

    return str.join('&')
  }

  constructor() {
  }

}
