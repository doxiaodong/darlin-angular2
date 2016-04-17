import {Request, XHRBackend, BrowserXhr, ResponseOptions, XHRConnection} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

@Injectable()
export class HttpInterceptor extends XHRBackend {

    constructor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions){
        super(_browserXHR, _baseResponseOptions);
    }

    createConnection(request: Request): XHRConnection {

        let connection = super.createConnection(request);

        // connection.request.headers.set('Cache-Control', 'public, max-age=31536000');

        // connection.response.toPromise()
        // .then((res) => {
        //   console.log(res, connection.request);
        // });
        // connection.response.subscribe((res) => {
        //   console.log(res, connection.request);
        // });

        return connection;

    }

}

// TODO: add response interceptor
