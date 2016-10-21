// Add third part in vendor not main.js
// Angular 2
// import '@angular/platform-browser'
import '@angular/platform-browser-dynamic'
import '@angular/core'
import '@angular/common'
import '@angular/http'
import '@angular/router'

// // RxJS
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/toPromise'
import 'rxjs/Subject'

if ('production' === ENV) {
  // Production

} else {
  // Development

}
