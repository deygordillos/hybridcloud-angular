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
    //const isValidRefreshToken = this.tokenService.isValidToken('refreshToken');
    const isValidRefreshToken = this.authService.getUser();

    console.log(isValidRefreshToken)

    if (!isValidRefreshToken) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }

}
