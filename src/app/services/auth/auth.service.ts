import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  login(username: string, password: string, recuerdame: boolean) {
    // Todo
  }

  getDataUser() {
    // Todo
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>('', { refreshToken })
      .pipe(
        tap(response => {
          this.tokenService.saveToken('token', response.token);
          this.tokenService.saveToken('refreshToken', response.refreshToken);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken('token');
    this.tokenService.removeToken('refreshToken');
  }
}
