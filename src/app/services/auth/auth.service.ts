import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject} from 'rxjs';
import { TokenService } from '@services/token/token.service';
import { environment } from '@environments/environment';
import { User } from '@app/models/user.model';

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

  login(usuario: string, password: string/* , recuerdame: boolean */) : Observable<User> {
    const auth = btoa(`${usuario.trim()}:${password.trim()}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${auth}`,
    });

    return this.httpClient.post<User>(`${this.url}/auth/login`, null, { headers, observe: 'response' })
      .pipe(
        tap((response: HttpResponse<unknown>) => {
          const headers: HttpHeaders = response.headers;
          const accessToken: string | null = headers.get('Authorization');
          const setCookieHeader: string | null = headers.get('set-cookie');
          const refreshToken: string | null = this.extractCookieValue(setCookieHeader, 'refreshToken');
          console.log(setCookieHeader);

          if (accessToken) {
            this.tokenService.saveToken('accessToken', accessToken);
            //this.tokenService.saveToken('refreshToken', refreshToken);
          }
        }),
        map(response => {
          const data = response.body as User;

          this.saveUser(data);

          return data;
        })
      );
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

  private extractCookieValue(cookieHeader: string | null, cookieName: string): string | null {
    if (!cookieHeader) {
      return null;
    }

    const cookiePrefix = `${cookieName}=`;
    const cookieList = cookieHeader.split(';');

    for (const cookie of cookieList) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(cookiePrefix)) {
        return trimmedCookie.substring(cookiePrefix.length);
      }
    }

    return null;
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>('', { refreshToken })
      .pipe(
        tap(response => {
          this.tokenService.saveToken('accessToken', response.token);
          this.tokenService.saveToken('refreshToken', response.refreshToken);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken('accessToken');
    this.tokenService.removeToken('refreshToken');
    localStorage.clear();
  }
}
