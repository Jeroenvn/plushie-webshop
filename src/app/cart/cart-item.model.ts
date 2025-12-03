import { Product } from "../product/product.model";

export class CartItem {
  constructor(
    public product: Product,
    public amount: number
  ){}

  get productId(): string {
    return this.product.id
  }
}
