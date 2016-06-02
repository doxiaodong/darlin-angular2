interface Emojione {
  toShort(toShort: string): string;
  shortnameToImage(shortnameToImage: string): string;
  unicodeToImage(unicodeToImage: string): string;
  toImage(toImage: string): string;
}

declare module "emojione" {
  export = emojione;
}

declare var emojione: Emojione;
