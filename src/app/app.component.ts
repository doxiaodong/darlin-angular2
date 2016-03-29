import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {MarkedService} from './base/marked/marked.service';

import {
  TranslateService,
  TranslatePipe,
  LangChangeEvent
} from 'ng2-translate/ng2-translate';

import {NavbarComponent} from './navbar/navbar.component';
import {BaseApi} from './base/api/base.api';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less')
  ],
  providers: [Title, TranslateService, BaseApi],
  directives: [NavbarComponent]
})
export class RootAppComponent {

  public articleText: string;

  onSignOut() {
    console.log('signout-app')
  }

  overview(base: BaseApi) {
    base.overview()
    .subscribe((res) => {
      console.log(res);
    });
  }

  constructor(title: Title, translate: TranslateService, base: BaseApi, m: MarkedService) {
    translate.use('zh_CN');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event);
    })
    console.log(title.getTitle());
    title.setTitle('darlin.me');

    this.overview(base);

    this.articleText = m.init()(`

      不要问C++出身的我为什么要用C刷题... 刷题写的C++代码，类、多态、运算符重载，都不用，太low，索性用C了，毕竟最快呀～～～
      然而事实证明C也没这么顺手，开帖记录下。

      - 输入输出 （这个以后再详细聊，先贴点代码）

              #include <stdio.h>
              #include <stdlib.h>

              int main () {
                  FILE *fin  = fopen ("test.in", "r");
                  FILE *fout = fopen ("test.out", "w");
                  int a, b;
                  fscanf (fin, "%d %d", &a, &b);
                  fprintf (fout, "%d\n", a+b);
                  exit (0);
              }

      - 没有min()，max()函数？ （为了这么短的代码include个头文件好像有点傻）

            #define min(x,y)  ( x < y ? x:y);
      用宏定义的方法可以节省函数调用开销。

      - 没有内建bool类型

      非0为真，0为假。要用bool这个类型，还得自己动手，丰衣足食╮(╯▽╰)╭
            #define TRUE 1
            #define FALSE 0
            typedef unsigned char BOOL;
      或者
            enum BOOL {FALSE,TRUE}；
      正规的代码里见到的是第一种写法。但是enum类型本身也不占内存，编译器直接替换，所以在我看来第二种写法更简洁。
      当然懒人还是选择这样：
            #include <stdbool.h>

      未完待续……

    `);

  }
}
