import { Product } from "../product/product.model";

export class Order {
  constructor(
    id: number,
    userId: number,
    orderItems: [{
      product: Product,
      amount: number
    }]
  ) {}

  get id(): number {
    return this.id;
  }

  get orderItems(): [{product: Product, amount: number}] {
    return this.orderItems;
  }
}
