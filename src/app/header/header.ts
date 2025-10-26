import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private authService = inject(AuthService);

  isAuthenticated = false;
  isAdmin = true;

  ngOnInit(): void {
    this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
  }

  onLogout() {
    throw new Error('Method not implemented.');
  }
}
