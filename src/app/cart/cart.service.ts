import { effect, Injectable, OnInit, signal } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
      console.log(updatedCart[0]);
      if (updatedCart[existingItemIndex].amount <= 0) updatedCart.splice(existingItemIndex, 1);
      console.log(updatedCart[0]);
      console.log(updatedCart)

      return updatedCart;
    });
  }
}
