import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }
  // Ajoute le token a la request si il y en a un
  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    if (token) {
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      return request;
    }
  }
}
