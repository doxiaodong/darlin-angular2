import { Component } from '@angular/core'
import { PageAnimateFn } from 'app/share/declarations/page-animate/page-animate'
import { LinksApi } from './links.api'
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms'
import { Checkmark } from 'app/share/icon'
import { AlertService } from 'app/declarations/alert/alert.service'

const md5 = require('crypto-js/md5')
const sha512 = require('crypto-js/sha512')

interface IGenpassword {
  initPassword: string
  key: string
  output: string
  output15: string,
  copyOutput: (e: boolean) => void
}

@Component({
  selector: 'links',
  templateUrl: './fourth.template.html',
  styleUrls: [
    './fourth.less'
  ],
  animations: [
    PageAnimateFn()
  ]
})

export class FourthIndexComponent {
  genPasswordForm: FormGroup
  public icon = {
    checkmark: Checkmark
  }
  public gen: IGenpassword = {
    initPassword: '',
    key: '',
    output: '',
    output15: '',
    copyOutput(e) {
      if (e) {
        GLOBAL_VALUE.TRANSLATE.get('pages.fourth.copySuccess').subscribe((value: string) => {
          AlertService.show(value)
        })
      } else {
        GLOBAL_VALUE.TRANSLATE.get('pages.fourth.copyError').subscribe((value: string) => {
          AlertService.show(value)
        })
      }
    }
  }

  public links: any[] = []

  private getLinks() {
    LinksApi.getLinks()
      .then(data => {
        this.links = data.results
      })
  }

  public resetGenPassword() {
    this.gen.output = ''
    this.gen.output15 = ''
  }

  public genPasswordFn(): void {
    let pString: string = sha512(this.gen.initPassword).toString()
    let kString: string = sha512(this.gen.key)
    let shaString: string = sha512(pString + kString).toString()
    this.gen.output = md5(shaString).toString()
    this.gen.output15 = this.gen.output.slice(0, 14)
  }

  constructor(
    fb: FormBuilder
  ) {
    this.getLinks()

    this.genPasswordForm = fb.group({
      initPassword: [
        '',
        []
      ],
      key: [
        '',
        Validators.required
      ]
    })
  }

}
