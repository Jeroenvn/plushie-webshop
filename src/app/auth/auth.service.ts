import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  signUp(username: String, password: String) {
    return this.httpClient.post('http://localhost:8081/auth/newUser', {
      username: username,
      password: password,
    });
  }

  login(username: String, password: String) {
    return this.httpClient.post('http://localhost:8081/auth/generateToken', {
      username: username,
      password: password,
    });
  }
}
