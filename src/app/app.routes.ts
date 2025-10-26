import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { ProductPage } from './product/product-page/product-page';
import { CartPage } from './cart/cart-page/cart-page';
import { ManageProductsPage } from './manage-products-page/manage-products-page';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductPage,
    title: 'Products',
  },
  {
    path: 'manage-products',
    component: ManageProductsPage,
    title: 'Manage Products',
  },
  {
    path: 'cart',
    component: CartPage,
    title: 'Shopping Cart',
  },
  {
    path: 'auth',
    component: Auth,
    title: 'Authentication',
  },
  {
    path: '**',
    component: ProductPage,
    title: 'Products',
  },
];
