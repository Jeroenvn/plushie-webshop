import { inject, Injectable, OnInit, signal } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Product } from '../product/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  private _cart = signal<CartItem[]>([]);
  public cart = this._cart.asReadonly();

  addToCart(product: Product) {
    this._cart.update((cart) => {
      const existingItemIndex = cart.findIndex((cartItem) => cartItem.product.id === product.id);

      const updatedCart = [...cart];
      if (existingItemIndex < 0) {
        updatedCart.push(new CartItem(product, 1));
      } else {
        updatedCart.at(existingItemIndex)!.amount++;
      }

      return updatedCart;
    });
  }

  removeFromCart(productId: string) {
    this._cart.update((cart) => {
      const existingItemIndex = cart.findIndex((cartItem) => cartItem.product.id === productId);

      if (existingItemIndex < 0) return cart;

      const updatedCart = [...cart];
      updatedCart[existingItemIndex].amount--;
      if (updatedCart[existingItemIndex].amount <= 0) updatedCart.splice(existingItemIndex, 1);

      return updatedCart;
    });
  }

  orderCart() {
    let user: User | null = this.authService.user.value;
    if (!user){
      console.log("No user logged in");
      return;
    }

    let cart: CartItem[] = this._cart();
    let orderItems: {productId: String, amount: number}[] = [];
    cart.forEach((element) => {
      let item = {
        productId: element.productId,
        amount: element.amount,
      };
      orderItems.push(item);
    });
    return this.httpClient.post(environment.apiUrl + '/users/' + user.id + '/orders', {
      orderItems,
    });
  }
}
