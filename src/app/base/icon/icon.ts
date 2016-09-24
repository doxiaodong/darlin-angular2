import {
  Component,
  Input,
  ViewEncapsulation,
  NgModule
} from '@angular/core'

@Component({
  selector: 'icon',
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg class="icon" [attr.width]="width" [attr.height]="height" [attr.fill]="fill">
      <use [attr.xlink:href]="glyph"></use>
    </svg>
  `
})
export class Icon {
  @Input() width: number = 14
  @Input() height: number = 14
  @Input() glyph: string
  @Input() fill: string
}

@NgModule({
  declarations: [
    Icon
  ],
  exports: [
    Icon
  ]
})
export class IconModule { }
