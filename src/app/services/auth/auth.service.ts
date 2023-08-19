import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { TokenService } from '@services/token/token.service';
import { environment } from '@environments/environment';
import { User } from '@app/models/user.model';
import { LoginResponse } from '@app/models/loginResponse.model';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | null>(null);
  url = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  login(usuario: string, password: string/* , recuerdame: boolean */) : Observable<LoginResponse> {
    const auth = btoa(`${usuario.trim()}:${password.trim()}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${auth}`,
    });

    return this.httpClient.post<LoginResponse>(`${this.url}/v1/auth/login`, null, { headers })
      .pipe(
        tap(response => {
          const { accessToken, refreshToken, data } = response;

          if (accessToken && refreshToken)
            this.saveLogin(accessToken, refreshToken, data);
        }),
        map(response => {
          return response;
        })
      );
  }

  saveLogin(accessToken: string, refreshToken: string, user: User): void {
    this.tokenService.saveToken('accessToken', accessToken);
    this.tokenService.saveToken('refreshToken', refreshToken);
    this.saveUser(user);
  }

  saveUser(user: User | null): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.$user.next(user);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');

    if (!user) return null;

    return JSON.parse(user);
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/v1/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          const { accessToken, refreshToken, data } = response;

          if (accessToken && refreshToken)
            this.saveLogin(accessToken, refreshToken, data);
        })
      );
  }

  testToken() {
    return this.httpClient.post<any>(`${this.url}/v1/auth/test`, null, { context: checkToken() });
  }

  logout(): void {
    this.tokenService.removeToken('accessToken');
    this.tokenService.removeToken('refreshToken');
    localStorage.clear();
  }
}
