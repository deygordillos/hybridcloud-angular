import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  finalize,
  lastValueFrom,
  switchMap,
  takeWhile,
  throwError,
} from 'rxjs';
import { TokenService } from '@app/services/token/token.service';
import { AuthService } from '@app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '@app/services/utils/utils.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      request = this.addToken(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.utilsService.openToast({
              severity: 'error',
              summary: 'Error',
              detail: 'El servicio no responde',
            });

            return throwError(() => console.log('Service not found'));
          }

          if (
            (error.status === 400 || error.status === 401) &&
            request.url.endsWith('auth/refresh')
          ) {
            // Error al intentar obtener el token
            this.redirectLogout();
            return throwError(() => {});
          }

          const refreshToken = this.tokenService.getToken('refreshToken');
          const isValidRefreshToken =
            this.tokenService.isValidToken('refreshToken');

          if (
            (error.status === 400 || error.status === 401) &&
            refreshToken &&
            isValidRefreshToken
          ) {
            return this.authService.refreshToken(refreshToken).pipe(
              switchMap(() => {
                if (request.context.get(CHECK_TOKEN))
                  request = this.addToken(request);

                return next.handle(request);
              }),
              catchError(() => {
                if (!request.url.endsWith('auth/refresh'))
                  this.redirectLogout();

                return throwError(() => console.log('Session expired'));
              })
            );
          }
        }

        return throwError(() => console.log(error.message));
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.tokenService.getToken('accessToken');
    const isValidRefreshToken = this.tokenService.isValidToken('refreshToken');

    if (accessToken && isValidRefreshToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return request;
    }

    return request;
  }

  redirectLogout(): void {
    this.authService.logout();
    const currentPath = this.router.url;
    this.router.navigate(['/auth/login'], {
      queryParams: {
        redirect: encodeURIComponent(currentPath),
      },
    });

    this.utilsService.openToast({
      severity: 'error',
      summary: 'Expiró la sesión',
      detail: 'Vuelva a iniciar sesión para acceder al sistema',
    });
  }
}
