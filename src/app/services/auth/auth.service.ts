import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { TokenService } from '@services/token/token.service';
import { environment } from '@environments/environment';
import { User } from '@app/models/user.model';
import { LoginResponse } from '@app/models/loginResponse.model';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | null>(null);
  url = environment.API_URL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  login(
    username: string,
    password: string /* , recuerdame: boolean */
  ): Observable<LoginResponse> {
    const auth = btoa(`${username.trim()}:${password.trim()}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${auth}`,
    });

    return this.httpClient
      .post<LoginResponse>(`${this.url}/v1/auth/login`, { username: username.trim(), password: password.trim() }, { headers })
      .pipe(
        tap(response => {
          const { access_token, refresh_token, data } = response;

          if (access_token && refresh_token)
            this.saveLogin(access_token, refresh_token, data);
        }),
        map(response => {
          return response;
        })
      );
  }

  saveLogin(access_token: string, refresh_token: string, user: User): void {
    this.tokenService.saveToken('accessToken', access_token);
    this.tokenService.saveToken('refreshToken', refresh_token);
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

  refreshToken(refresh_token: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.url}/v1/auth/refresh`, { refresh_token })
      .pipe(
        tap(response => {
          const { access_token, refresh_token, data } = response;

          if (access_token && refresh_token)
            this.saveLogin(access_token, refresh_token, data);
        })
      );
  }

  testToken() {
    return this.httpClient.post<any>(`${this.url}/v1/auth/test`, null, {
      context: checkToken(),
    });
  }

  logout(): void {
    this.tokenService.removeToken('accessToken');
    this.tokenService.removeToken('refreshToken');
    localStorage.clear();
  }
}
