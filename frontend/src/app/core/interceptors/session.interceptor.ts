import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  const isBackendCall =
    req.url.startsWith(environment.apiBase) ||
    req.url.startsWith(environment.authApiBase);
  if (!isBackendCall) {
    return next(req);
  }
  const token = inject(AuthService).getSessionToken();
  if (!token) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { 'X-Session-Id': token } }));
};
