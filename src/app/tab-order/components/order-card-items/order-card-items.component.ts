import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, OrderStatus, OrderType } from '../../../models/classes';

@Component({
  selector: 'order-card-items',
  templateUrl: './order-card-items.component.html',
  styleUrls: ['./order-card-items.component.scss'],
})
export class OrderCardItemsComponent implements OnInit {

  @Input() orders: Order[] = [];
  @Input() isUpcoming = false;

  @Output() reorderClick = new EventEmitter<Order>();
  @Output() trackClick = new EventEmitter<Order>();
  @Output() showReceipt = new EventEmitter<Order>();

  constructor() { }

  ngOnInit() { }

  getOrderStatus(orderStatus: OrderStatus, orderType: OrderType) {
    if (orderStatus === OrderStatus.NONE) {
      return 'Confirming';
    } else if (orderStatus === OrderStatus.PREPARING) {
      return 'Being prepared';
    } else if (orderStatus === OrderStatus.READY) {
      return orderType === OrderType.PICKUP ? 'Ready for pickup' : 'Ready for delivery';
    } else if (orderStatus === OrderStatus.DELIVERING) {
      return 'On the way';
    } else if (orderStatus === OrderStatus.COMPLETE) {
      return 'Completed';
    } else if (orderStatus === OrderStatus.CANCELLED) {
      return 'Cancelled';
    } else {
      return '';
    }
  }
}
