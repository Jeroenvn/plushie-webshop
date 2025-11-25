import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { ManageProductItem } from "../manage-product-item/manage-product-item";
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductCreateDto } from '../product/product-create-dto.model';
import { FloatLabel } from "primeng/floatlabel";

@Component({
  selector: 'app-manage-products-page',
  imports: [ManageProductItem, Button, Dialog, FloatLabel, ReactiveFormsModule],
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

  onDeleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (responseData) => console.log(responseData),
    });
  }

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    category: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    let product: ProductCreateDto = new ProductCreateDto(
      this.form.controls.name.value!,
      this.form.controls.description.value!,
      this.form.controls.category.value!
    );

    this.productService.postProduct(product).subscribe();

    this.form.reset();
    this.isAddingProduct = false;
  }
}

