import * as marked from 'marked';
import * as hljs from 'highlight.js';

export class MarkedService {

  private options: any = {};

  setRenderer(obj: any): MarkedStatic {
    let render = new marked.Renderer();
    let o = Object.keys(obj);
    let l = o.length;
    while (l--) {
      render[o[l]] = obj[o[l]];
    }
    this.options.renderer = render;
    console.log(this.options)
    marked.setOptions(this.options);
    return marked;
  }

  setOptions(obj: any) {
    this.options = obj;
  }

  init(): MarkedStatic {
    return marked;
  }

  constructor() {
    this.setOptions({
      highlight: (text, language) => {
        console.log(11)
        console.log(text, language)
        let lang = '';
        if (language) {
          lang = ' lang-' + language;
        }
        let html = hljs.highlightAuto(text).value;
        let lines = new Array(html.split(/\n/).length + 1).join('<span></span>');

        return '<pre><code class="hljs'
          + lang
          + '"><span class="hjln">'
          + lines
          + '</span>'
          + html
          + '</code></pre>';
      }
    });
    this.setRenderer({
      heading: (text, level) => {
        let ele = document.createElement('a');
        ele.innerHTML = text;
        //var encodeText = encodeURI(innerText);
        return '<h'
          + level
          + ' id="'
          + text
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
      }
    });
  }

}