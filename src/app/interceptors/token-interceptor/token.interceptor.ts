import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@app/services/token/token.service';
import { AuthService } from '@app/services/auth/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new  HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      return this.addToken(request, next);
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken('accessToken');

    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(authRequest);
    } else {
      this.updateAccessTokenAndRefreshToken(request, next);
    }

    return next.handle(request);
  }

  private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenService.getToken('refreshToken');
    const isValidRefreshToken = this.tokenService.isValidToken('refreshToken');

    if (refreshToken && isValidRefreshToken) {
      return this.authService.refreshToken(refreshToken)
        .pipe(
          switchMap(() => this.addToken(request, next))
        );
    }

    return next.handle(request);
  }
}
