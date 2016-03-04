import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';

import {RootAppComponent} from './app/app';

enableProdMode();

bootstrap(RootAppComponent)
.catch(err => console.error(err));
