import {Injector, Provider} from 'angular2/core';

export var ApiPrefix = Injector.resolveAndCreate([
  // new Provider("API_PREFIX", { useValue: '/api' })
  new Provider("API_PREFIX", { useValue: '//api.darlin.me' })
]);