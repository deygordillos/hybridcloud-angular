import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { TokenService } from '@app/services/token/token.service';
import { UtilsService } from '@app/services/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  canActivate(): boolean {
    const isValidRefreshToken = this.tokenService.isValidToken('refreshToken');

    if (!isValidRefreshToken) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);

      this.utilsService.openToast({
        severity: 'error',
        summary: 'Expiró la sesión',
        detail: 'Vuelva a iniciar sesión para acceder al sistema'
      });

      return false;
    }

    return true;
  }

}
