import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App implements OnInit {
  private authService = inject(AuthService);

  protected readonly title = signal('plushie-webshop');

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
