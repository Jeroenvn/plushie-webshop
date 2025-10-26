import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product.model';
import { ProductCreateDto } from './product-create-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);

  getAllProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8081/products');
  }

  postProduct(product: ProductCreateDto) {
    return this.httpClient.post('http://localhost:8081/products', {
      product,
    });
  }

  deleteProduct(productId: string) {
    return this.httpClient.delete('http://localhost:8081/products/' + productId);
  }
}
