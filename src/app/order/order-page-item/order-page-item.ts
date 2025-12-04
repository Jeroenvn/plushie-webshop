import { Component, input } from '@angular/core';
import { Card } from "primeng/card";
import { Order } from '../order.model';

@Component({
  selector: 'app-order-page-item',
  imports: [Card],
  templateUrl: './order-page-item.html',
  styleUrl: './order-page-item.sass',
})
export class OrderPageItem {
  order = input.required<Order>();
}
