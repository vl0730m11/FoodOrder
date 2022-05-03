import { Component, OnInit } from '@angular/core';
import { RootStoreState, CartStoreActions, RestaurantStoreSelectors } from '../root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order, OrderStatus, RestaurantBranch, CartItem } from '../models/classes';
import { map } from 'rxjs/operators';
import { OrderStoreSelectors, OrderStoreActions } from '../root-store/order-store/order-index';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ModalService } from '../shared/services/modal.service';
import { OrderProgressModal } from './components/order-progress/order-progress.component';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.page.html',
  styleUrls: ['./tab-order.page.scss'],
})
export class TabOrderPage implements OnInit {

  upcomingOrder$: Observable<Order[]>;
  historyOrder$: Observable<Order[]>;
  branches: RestaurantBranch[] = [];

  selectedBranch: RestaurantBranch;

  isUpcoming = true;
  isHistory = false;

  header: string = 'Upcoming orders';
  constructor(
    private store$: Store<RootStoreState.AppState>,
    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.store$.dispatch(OrderStoreActions.loadUserOrders());

    this.upcomingOrder$ = this.store$.select(OrderStoreSelectors.getUserNewOrders);
    // .pipe(map(orders => orders ? orders.filter(o => o.status !== OrderStatus.COMPLETE && o.status !== OrderStatus.CANCELLED) : []
    // ));

    this.historyOrder$ = this.store$.select(OrderStoreSelectors.getUserPastOrders);
    //   .pipe(map(orders => orders ? orders.filter(o => o.status === OrderStatus.COMPLETE || o.status === OrderStatus.CANCELLED) : []
    // ));

    this.store$.select(RestaurantStoreSelectors.getBranches)
      .subscribe(branches => this.branches = branches).unsubscribe();
  }

  segmentChanged(tab: number) {
    this.isUpcoming = tab === 0;
    this.isHistory = tab === 1;

    this.header = this.isUpcoming ? 'Upcoming orders' : 'Past orders';
  }

  reorder(order: Order) {
    if (!order) { return; }

    let i = 0;
    const cartItems = order.cartItems.map(x => {
      const item = new CartItem();
      item.amount = x.amount;
      item.item = x.item;
      item.id = i;
      i++;
      return item;
    })
    this.store$.dispatch(CartStoreActions.updateCart({ items: cartItems }));
    this.modalService.openCheckout(this.routerOutlet.nativeEl);
  }

  showReceipt(order: Order) {
    this.modalService.showReceipt(order);
  }

  async trackOrder(order: Order) {
    const modal = await this.modalCtrl.create({
      component: OrderProgressModal,
      // cssClass: 'half-size-modal-css',
      componentProps: {
        order,
        branch: this.branches.find(b => b.id === order.branchId)
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  refreshOrders(event) {
    this.store$.dispatch(OrderStoreActions.loadUserNewOrders());
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
