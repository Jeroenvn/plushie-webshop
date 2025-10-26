import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCreateDto } from '../product/product-create-dto.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-add-product-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.css',
})
export class AddProductDialog {
  private productService = inject(ProductService);

  close = output();

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
    this.close.emit();
  }

  onCancel() {
    this.form.reset();
    this.close.emit();
  }
}
