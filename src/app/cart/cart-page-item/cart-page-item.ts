import { Component, input, output } from '@angular/core';
import { CartItem } from '../cart-item.model';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-cart-page-item',
  imports: [],
  templateUrl: './cart-page-item.html',
  styleUrl: './cart-page-item.sass',
})
export class CartPageItem {
  item = input.required<CartItem>();
  increaseAmount = output<Product>();
  decreaseAmount = output<Product>();

  onIncreaseAmount() {
    this.increaseAmount.emit(this.item().product);
  }

  onDecreaseAmount() {
    this.decreaseAmount.emit(this.item().product);
  }
}
