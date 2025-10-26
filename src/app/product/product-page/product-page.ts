import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductItem } from "../product-item/product-item";

@Component({
  selector: 'app-product-page',
  imports: [ProductItem],
  templateUrl: './product-page.html',
  styleUrl: './product-page.sass',
})
export class ProductPage implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  isLoading: boolean = false;
  isUpdated: boolean = false;

  ngOnInit(): void {
    this.updateProducts();
  }

  private updateProducts() {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.isUpdated = true;
        this.products.set(responseData);
      }
    })
  }
}
