interface Emojione {
  toShort(toShort: string): string
  shortnameToImage(shortnameToImage: string): string
  unicodeToImage(unicodeToImage: string): string
  toImage(toImage: string): string
}

declare const emojione: Emojione

declare module 'emojione' {
  export = emojione
}
