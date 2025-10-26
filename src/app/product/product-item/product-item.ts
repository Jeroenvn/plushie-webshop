import { Component, input, output } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.sass',
})
export class ProductItem {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}
