import {
  Component,
  OnInit
} from '@angular/core'
import { LoadingService } from './loading.service'

@Component({
  selector: 'loading',
  template: `
    <div class="xd-loading show" *ngIf="loading.isLoading">
      <div class="loading"></div>
    </div>
  `,
  styleUrls: [
    './loading.less'
  ]
})

export class LoadingComponent implements OnInit {

  public loading: any

  ngOnInit() {
    this.loading = LoadingService
  }

}
