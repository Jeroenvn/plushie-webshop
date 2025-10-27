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
  isAdmin = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (!!user) {
        this.isAuthenticated = true;
        this.isAdmin = user.isAdmin;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
