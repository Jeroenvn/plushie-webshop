import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.token) {
      return handler.handle(req);
    }
    const modifiedRequest = req.clone({
      headers: new HttpHeaders().append('Authorization', "Bearer " + this.authService.token),
    });
    return handler.handle(modifiedRequest);
  }
}
