import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

const ENDPOINT = 'http://localhost:3000';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.needAuth(request.url, request.method)) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token ? `${this.token}` : '',
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && err.error.data === 'Token expired') {
          // hacer algo
        }
        throw err;
      })
    );
  }

  get token() {
    return localStorage.getItem('token');
  }

  private needAuth(url: string, method: string) {
    const needUrl = url.includes(`${ENDPOINT}/api`);
    const needMethod = method !== 'GET';
    return needMethod && needUrl;
  }
}
