import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product.model';
import { ProductCreateDto } from './product-create-dto.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);

  getAllProducts() {
    return this.httpClient.get<Product[]>(environment.apiUrl + '/products');
  }

  postProduct(product: ProductCreateDto) {
    return this.httpClient.post(environment.apiUrl + '/products', product);
  }

  deleteProduct(productId: string) {
    return this.httpClient.delete(environment.apiUrl + '/products/' + productId);
  }
}
