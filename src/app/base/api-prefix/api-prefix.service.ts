import {ReflectiveInjector, Provider} from '@angular/core';

let provider: any;

if ('production' === ENV) {
  // Production
  provider = new Provider("API_PREFIX", { useValue: '//api.darlin.me' });

} else {
  // Development
  provider = new Provider("API_PREFIX", { useValue: '/api' });
}

export var ApiPrefix = ReflectiveInjector.resolveAndCreate([
  provider
]);
