import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { OrderPageItem } from "../order-page-item/order-page-item";

@Component({
  selector: 'app-orders-page',
  imports: [OrderPageItem],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.sass',
})
export class OrdersPage implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.orderService.getAllOrders()!.subscribe({
      next: (responseData) => {
        this.orders.set(responseData);
        console.log(this.orders());
      }
    })
  }
}
