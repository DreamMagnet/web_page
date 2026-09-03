import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from '../models/user.model';

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 7;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  getSessionToken(): string | null {
    return this.readCookie(environment.sessionCookieName);
  }

  register(payload: RegisterPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.authApiBase}/auth/register`, payload)
      .pipe(tap((res) => this.applyLogin(res)));
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.authApiBase}/auth/login`, payload)
      .pipe(tap((res) => this.applyLogin(res)));
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.authApiBase}/auth/logout`, {}).pipe(
      tap(() => this.clearLocalSession()),
      catchError(() => {
        this.clearLocalSession();
        return of(void 0);
      }),
    );
  }

  updateProfile(payload: UpdateProfilePayload): Observable<User> {
    return this.http
      .put<User>(`${environment.apiBase}/users/me`, payload)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  restore(): Observable<User | null> {
    const token = this.getSessionToken();
    if (!token) {
      return of(null);
    }
    return this.http.get<User>(`${environment.apiBase}/users/me`).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError((err) => {
        this.clearLocalSession();
        return throwError(() => err);
      }),
    );
  }

  private applyLogin(res: LoginResponse): void {
    this.writeCookie(environment.sessionCookieName, res.session_token, COOKIE_MAX_AGE_SEC);
    this.currentUser.set(res.user);
  }

  private clearLocalSession(): void {
    this.deleteCookie(environment.sessionCookieName);
    this.currentUser.set(null);
  }

  private readCookie(name: string): string | null {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    for (const c of cookies) {
      const [k, ...v] = c.split('=');
      if (k === name) return decodeURIComponent(v.join('='));
    }
    return null;
  }

  private writeCookie(name: string, value: string, maxAgeSec: number): void {
    document.cookie =
      `${name}=${encodeURIComponent(value)}; ` +
      `Max-Age=${maxAgeSec}; Path=/; SameSite=Lax`;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}
