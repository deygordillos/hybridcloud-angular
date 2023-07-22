import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { TokenService } from '@app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isValidRefreshToken = this.tokenService.isValidToken('refreshToken');

    if (!isValidRefreshToken) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }

}
