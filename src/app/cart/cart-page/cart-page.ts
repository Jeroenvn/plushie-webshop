import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CartService } from '../cart.service';
import { CartPageItem } from "../cart-page-item/cart-page-item";
import { Product } from '../../product/product.model';
import { CartItem } from '../cart-item.model';
import { Button } from "primeng/button";

@Component({
  selector: 'app-cart-page',
  imports: [CartPageItem, Button],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.sass',
})
export class CartPage {
  private cartService = inject(CartService);

  readonly cart: Signal<CartItem[]> = this.cartService.cart;

  onIncreaseAmount(product: Product) {
    this.cartService.addToCart(product);
  }

  onDecreaseAmount(product: Product) {
    this.cartService.removeFromCart(product.id);
  }

  onPlaceOrder() {
    console.log("Place order pressed");
  }

  get isCartEmpty(): boolean {
    return this.cart().length == 0;
  }
}
