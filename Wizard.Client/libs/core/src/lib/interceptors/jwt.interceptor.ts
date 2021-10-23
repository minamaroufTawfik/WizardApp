import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.accessToken) {
      req = req.clone({
        setHeaders: { authorization: `Bearer ${this.accessToken}` }
      })
    }
    return next.handle(req);
  }
}
