interface Base64Interface {
  VERSION: string;
  encode(a: string): string;
  encodeURI(a: string): string;
  decode(a: string): string;
}

interface JSBase64 {
  Base64: Base64Interface;
}

declare module 'js-base64' {
  export = base64;
}

declare var base64: JSBase64;
