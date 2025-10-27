import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  token: string;
  expiresInSeconds: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  user = new Subject<User | null>();
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
    this.router.navigate(['/auth']);
  }

  signUp(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>('http://localhost:8081/auth/newUser', {
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
            responseData.expiresInSeconds
          );
        })
      );
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>('http://localhost:8081/auth/generateToken', {
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
            responseData.expiresInSeconds
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
    const user = new User(username, userId, token, expirationDate);
    this.user.next(user);
  }
}
