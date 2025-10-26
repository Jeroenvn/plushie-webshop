import { Component, inject, OnInit, signal } from '@angular/core';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { ManageProductItem } from "../manage-product-item/manage-product-item";

@Component({
  selector: 'app-manage-products-page',
  imports: [AddProductDialog, ManageProductItem],
  templateUrl: './manage-products-page.html',
  styleUrl: './manage-products-page.sass',
})
export class ManageProductsPage implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading: boolean = false;
  isAddingProduct: boolean = false;

  ngOnInit(): void {
    this.updateProducts();
  }

  updateProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.products.set(responseData);
      },
    });
  }

  onCreateProduct() {
    this.isAddingProduct = true;
  }

  onDeleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: responseData => console.log(responseData)
    })
  }

  onCancelCreateProduct() {
    this.isAddingProduct = false;
  }
}

