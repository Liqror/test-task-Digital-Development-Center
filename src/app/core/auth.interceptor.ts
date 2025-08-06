import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();
    // console.log('AuthInterceptor token:', token);
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Token ${token}` }
      });
    //   console.log('AuthInterceptor cloned request headers:', cloned.headers.keys());
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
