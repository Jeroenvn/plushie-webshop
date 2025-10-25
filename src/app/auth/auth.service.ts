import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  signUp(username: String, password: String) {
    return this.httpClient
      .post<AuthResponseData>('http://localhost:8081/auth/newUser', {
        username: username,
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  login(username: String, password: String) {
    return this.httpClient
      .post<AuthResponseData>('http://localhost:8081/auth/generateToken', {
        username: username,
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    errorMessage = errorResponse.error.message;
    return throwError(errorMessage);
  }
}
