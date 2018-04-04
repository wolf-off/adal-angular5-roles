import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AdalService } from '../services/adal-service';


@Injectable()
export class AuthorisationInterceptor implements HttpInterceptor {
  constructor(private adal: AdalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let context = (<any>this.adal).context;
    let resource = context.getResourceForEndpoint(req.url);
    if (resource) {
      let observer;
      let result = new Observable<HttpEvent<any>>((obs) => { observer = obs });
      result.subscribe();
      context.acquireToken(resource, (err, token) => {
        const authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) });
        next.handle(authReq)
          .catch((error, caught) => {
            return Observable.throw(error);
          }).subscribe((res) =>
            observer.next(res));
      });
      return result;
    } else {
      return next.handle(req);
    }
  }
}

