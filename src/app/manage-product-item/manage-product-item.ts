import { Component, input, output } from '@angular/core';
import { Product } from '../product/product.model';
import { Card } from "primeng/card";
import { Button } from "primeng/button";

@Component({
  selector: 'app-manage-product-item',
  imports: [Card, Button],
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
