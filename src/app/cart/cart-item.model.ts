import { Product } from "../product/product.model";

export class CartItem {
  constructor(
    public product: Product,
    public amount: number
  ){}
}
