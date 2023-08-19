import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

type nameToken = 'accessToken' | 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(name: nameToken, value: string): void {
    setCookie(name, value, { expires: 365, path: '/', sameSite: 'lax' });
  }

  getToken(name: nameToken): string | undefined {
    return getCookie(name);
  }

  removeToken(name: nameToken): void {
    removeCookie(name, { path: '/', sameSite: 'lax' });
  }

  isValidToken(name: nameToken): boolean {
    const token = this.getToken(name);

    if (!token) return false;

    const decodeToken = jwt_decode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);

      const today = new Date();

      return tokenDate.getTime() > today.getTime();
    }

    return false;
  }
}
