import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, IonRouterOutlet, ActionSheetController, AlertController } from '@ionic/angular';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { Order, OrderStatus, OrderType } from '../../../models/classes';
// import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit {

  // @Input() order: Order;
  @Input() orders: Order[] = [];

  @Output() cancelOrder = new EventEmitter<Order>();
  @Output() completeOrder = new EventEmitter<Order>();

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  nextStatus(order: Order) {
    if (order.status === OrderStatus.COMPLETE) return;
    if (order.orderType === OrderType.PICKUP && order.status === 2) return;
    order.status++;
  }

  prevStatus(order: Order) {
    if (order.status === OrderStatus.PREPARING) return;
    order.status--;
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
      // {
      //   text: 'Call ' + order.customerName,
      //   icon: 'call',
      //   handler: () => {
      //     console.log('Share clicked');
      //   }
      // },
      // {
      //   text: 'Text ' + order.customerName,
      //   icon: 'mail',
      //   handler: () => {
      //     console.log('Share clicked');
      //   }
      // },
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
          slidingItem.close();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          slidingItem.close();
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
            slidingItem.close();
          }
        }, {
          text: 'Cancel',
          role: 'destructive',
          cssClass: 'danger',
          handler: () => {
            this.cancelOrder.emit(order);
            slidingItem.close();
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
            slidingItem.close();
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.completeOrder.emit(order);
            slidingItem.close();
          }
        }
      ]
    });

    await alert.present();
  }
}
