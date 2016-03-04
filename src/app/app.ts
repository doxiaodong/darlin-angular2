import {Component} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

@Component({
  selector: 'root-app',
  template: require('./app.template.html'),
  providers: [Title]
})
export class RootAppComponent {
  constructor(title: Title) {
    console.log(title.getTitle());
    title.setTitle('darlin.me');
  }
}
