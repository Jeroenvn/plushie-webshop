import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';

export interface AuthResponseData {
  token: string;
  expiresIn: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User | null>(null);
  token: string | null = null;

  constructor() {
    this.user.subscribe({
      next: (user) => {
        if (!user) {
          this.token = null;
        } else {
          this.token = user.token;
        }
      },
    });
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/auth']);
    }, expirationDuration);
  }

  autoLogin() {
    const rawUserData = localStorage.getItem('userData');

    if (!rawUserData) {
      return;
    }

    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(rawUserData);

    const decoded_token: {
      role: string;
    } = jwtDecode(userData._token);
    let isAdmin = false;
    if (decoded_token.role == 'ROLE_ADMIN') {
      isAdmin = true;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      isAdmin,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  signUp(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(environment.apiUrl + '/auth/newUser', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            username,
            responseData.userId,
            responseData.token,
            responseData.expiresIn
          );
        })
      );
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(environment.apiUrl + '/auth/generateToken', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            username,
            responseData.userId,
            responseData.token,
            responseData.expiresIn
          );
        })
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    errorMessage = errorResponse.error.message;
    return throwError(errorMessage);
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresInSeconds: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresInSeconds * 1000);
    const decoded_token: {
      role: string;
    } = jwtDecode(token);
    let isAdmin = false;
    if (decoded_token.role == 'ROLE_ADMIN') {
      isAdmin = true;
    }
    const user = new User(username, userId, isAdmin, token, expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresInSeconds * 1000);
  }
}
