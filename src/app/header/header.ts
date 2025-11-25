import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [Menubar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  items: MenuItem[] | undefined;
  isAuthenticated = false;
  isAdmin = false;

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(){
    this.authService.user.subscribe((user) => {
      if (!!user) {
        this.isAuthenticated = true;
        this.isAdmin = user.isAdmin;
      }
      else {
        this.isAuthenticated = false;
        this.isAdmin = false;
      }
      this.updateMenuItems();
    });
  }

  updateMenuItems(){
    this.items = [];

    this.items.push({
      label: 'Products',
      command: () => {
        this.router.navigate(['/products'])
      },
    });

    if (!this.isAuthenticated){
      this.items.push({
        label: 'Login',
        command: () => {
          this.router.navigate(['/auth']);
        },
      });
    }
    else{
      this.items.push({
        label: 'Cart',
        command: () => {
          this.router.navigate(['/cart']);
        },
      });
      if (this.isAdmin){
        this.items.push({
          label: 'Manage products',
          command: () => {
            this.router.navigate(['/manage-products']);
          },
        });
      }
      this.items.push({
        label: 'Logout',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
      });
    }

  }
}
