import {Component, OnInit} from 'angular2/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'loading',
  template: `
    <div class="xd-loading" [class.show]="loading.isLoading">
      <div class="loading"></div>
    </div>
  `,
  styles: [
    require('./loading.less')
  ]
})

export class LoadingComponent implements OnInit {

  public loading: any;

  ngOnInit() {
    this.loading = LoadingService;
  }

  constructor() {

  }

}