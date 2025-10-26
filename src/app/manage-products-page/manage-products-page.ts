import { Component } from '@angular/core';
import { AddProductDialog } from "../add-product-dialog/add-product-dialog";

@Component({
  selector: 'app-manage-products-page',
  imports: [AddProductDialog],
  templateUrl: './manage-products-page.html',
  styleUrl: './manage-products-page.sass'
})
export class ManageProductsPage {
  isAddingProduct: boolean = false;

  onCreateProduct() {
    this.isAddingProduct = true;
  }

  onCancelCreateProduct() {
    this.isAddingProduct = false;
  }
}
