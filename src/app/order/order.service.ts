import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Order } from './order.model';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  getAllOrders() {
    let user: User | null = this.authService.user.value;
        if (!user){
          console.log("No user logged in");
          return;
        }
    return this.httpClient.get<Order[]>(environment.apiUrl + "/users/" + user.id + "/orders");
  }
}
