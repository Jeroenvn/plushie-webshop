import { Component, input, output } from '@angular/core';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-manage-product-item',
  imports: [],
  templateUrl: './manage-product-item.html',
  styleUrl: './manage-product-item.sass',
})
export class ManageProductItem {
  product = input.required<Product>();
  delete = output();

  onDelete() {
    this.delete.emit();
  }
}
