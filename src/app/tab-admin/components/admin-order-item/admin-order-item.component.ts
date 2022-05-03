import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, OrderStatus, OrderType } from 'src/app/models/classes';
import { ModalController, IonRouterOutlet, ActionSheetController, AlertController } from '@ionic/angular';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
@Component({
  selector: 'admin-order-item',
  templateUrl: './admin-order-item.component.html',
  styleUrls: ['./admin-order-item.component.scss'],
})
export class AdminOrderItemComponent implements OnInit {

  @Input() order: Order;
  @Input() showDetailsAll: boolean = false;

  // @Output() complete = new EventEmitter<Order>();
  // @Output() cancel = new EventEmitter<Order>();
  @Output() updateOrder = new EventEmitter<Order>();

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private notifService: NotificationService,
    private modalService: ModalService,
    private printer: Printer
  ) { }

  ngOnInit() { }

  viewReceipt(order: Order) {
    this.modalService.showReceipt(order);
  }

  toggleDetails(e, order: Order) {
    e.stopPropagation();
    order.showDetails = !order.showDetails;
  }

  getOrderStatus(orderStatus: OrderStatus, orderType: OrderType) {
    if (orderStatus === OrderStatus.NONE) {
      return 'Received';
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

  nextStatus(order: Order, slidingItem) {
    if (order.status === OrderStatus.COMPLETE) {
      this.notifService.showAlert('Update Not Allowed', 'Order has been marked Complete');
      if (slidingItem) { slidingItem.close(); } return;
    }

    if (order.orderType === OrderType.PICKUP && order.status === 2) {
      const alert = this.notifService.showAlert('Update Not Allowed', 'Order is await for collection');
      if (slidingItem) { slidingItem.close(); }
      return;
    }

    if (order.orderType === OrderType.DELIVERY && order.status === 3) {
      this.notifService.showAlert('Update Not Allowed', 'Order is await for collection')
      if (slidingItem) { slidingItem.close(); }
      return;
    }

    order.status++;
    if (slidingItem) { slidingItem.close(); }
  }

  prevStatus(order: Order, slidingItem) {
    if (order.status === OrderStatus.NONE) { return; }
    order.status--;
    if (slidingItem) { slidingItem.close(); }
  }

  onSelectOrder(e, order: Order, slidingItem) {
    if (slidingItem) { slidingItem.close(); }
    if ([OrderStatus.COMPLETE, OrderStatus.CANCELLED].includes(order.status)) { return; }
    this.presentActionSheet(order, null);
  }

  async goToDetails(item: Order) {

    const modal = await this.modalController.create({
      component: OrderDetailsComponent,
      componentProps: {
        order: item
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  async presentActionSheet(order: Order, slidingItem) {


    const actionSheet = await this.actionSheetController.create({
      // header: 'Order',
      buttons: [{
        text: 'Cancel Order',
        role: 'destructive',
        icon: 'close',
        handler: () => {
          this.confirmCancel(order, slidingItem);
        }
      },
      this.getButtonForNextAction(order, slidingItem),
      {
        text: 'Mark as Complete',
        icon: 'checkmark',
        handler: () => {
          this.confirmComplete(order, slidingItem);
        }
      }, {
        text: 'View Details',
        icon: 'information-circle',
        handler: () => {
          this.goToDetails(order);
          if (slidingItem) { slidingItem.close(); }
        }
      },
      {
        text: 'Print Order',
        icon: 'print',
        handler: () => {
          this.printOrder(order);
          if (slidingItem) { slidingItem.close(); }
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          if (slidingItem) { slidingItem.close(); }
        }
      }]
    });
    await actionSheet.present();
  }

  private async confirmCancel(order: Order, slidingItem) {
    const alert = await this.alertController.create({
      header: 'Cancel "order #' + order.id + '"?',
      message: '',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            if (slidingItem) { slidingItem.close(); }
          }
        }, {
          text: 'Cancel',
          role: 'destructive',
          cssClass: 'danger',
          handler: () => {
            order.status = OrderStatus.CANCELLED;
            this.updateOrder.emit(order);
            if (slidingItem) { slidingItem.close(); }
          }
        }
      ]
    });
    await alert.present();
  }

  private async confirmComplete(order: Order, slidingItem) {
    const alert = await this.alertController.create({
      header: 'Mark "order #' + order.id + '" Completed ?',
      message: '',
      buttons: [
        {
          text: 'Close',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            slidingItem.closeOpened()
          }
        }, {
          text: 'Yes',
          handler: () => {
            order.status = OrderStatus.COMPLETE;
            this.updateOrder.emit(order);
            // this.complete.emit(order);
            if (slidingItem) { slidingItem.close(); }
          }
        }
      ]
    });

    await alert.present();
  }

  private printOrder(order: Order) {
    this.printer.isAvailable().then((onSuccess) => {
      let options: PrintOptions = {
        name: 'Order No. ' + order.id,
        duplex: true,
        orientation: 'portrait',
        monochrome: true
      };

      let content = 'Order No. ' + order.id + '/n';
      if (order.cartItems.length > 0) {
        order.cartItems.forEach(item => {
          content += item.item.title + 'X' + item.amount + '\n';
        });
      }
      content += 'End of order';
      console.log('content', content);
      this.printer.print(content, options);
    }, (err) => {
      console.log('Printer error', err);
    });
  }

  private getButtonForNextAction(order: Order, slidingItem) {
    let nextAction;
    if (order.status === OrderStatus.NONE) {
      nextAction = {
        text: 'Start Cooking Order',
        icon: 'alarm',
        handler: () => {
          order.status = OrderStatus.PREPARING;
          this.updateOrder.emit(order);
          if (slidingItem) { slidingItem.close(); }
        }
      };
    }

    if (order.orderType === OrderType.PICKUP) {
      if (order.status === OrderStatus.PREPARING) {
        nextAction = {
          text: 'Mark Ready For Pickup',
          icon: 'checkmark-circle',
          handler: () => {
            order.status = OrderStatus.READY;
            this.updateOrder.emit(order);
            if (slidingItem) { slidingItem.close(); }
          }
        };
      } else if (order.status === OrderStatus.READY) {
        nextAction = {
          text: 'Complete Order',
          icon: 'checkmark',
          handler: () => {
            this.confirmComplete(order, slidingItem);
          }
        };
      }
    }

    if (order.orderType === OrderType.DELIVERY) {
      if (order.status === OrderStatus.PREPARING) {
        nextAction = {
          text: 'Mark Ready For Delivery',
          icon: 'car',
          handler: () => {
            order.status = OrderStatus.READY;
            this.updateOrder.emit(order);
          }
        };
      } else if (order.status === OrderStatus.READY) {
        nextAction = {
          text: 'Mark Being Delivered',
          icon: 'car',
          handler: () => {
            order.status = OrderStatus.DELIVERING;
            this.updateOrder.emit(order);
          }
        };
      } else if (order.status === OrderStatus.DELIVERING) {
        nextAction = {
          text: 'Complete Order',
          icon: 'checkmark',
          handler: () => {
            this.confirmComplete(order, slidingItem);
          }
        };
      }
    }

    return nextAction;
  }
}
