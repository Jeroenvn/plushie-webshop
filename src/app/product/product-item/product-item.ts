import { Component, input, output } from '@angular/core';
import { Product } from '../product.model';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-product-item',
  imports: [Card, Button],
  templateUrl: './product-item.html',
  styleUrl: './product-item.sass',
})
export class ProductItem {
  product = input.required<Product>();
  addToCart = output();

  onAddToCart() {
    this.addToCart.emit();
  }
}
