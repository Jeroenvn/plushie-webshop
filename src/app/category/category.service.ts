import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Category } from './category.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient);

  public getCategories() {
    return this.httpClient.get<Category[]>(environment.apiUrl + "/categories");
  }
}
