import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);

  getAllProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8081/products');
  }
}
