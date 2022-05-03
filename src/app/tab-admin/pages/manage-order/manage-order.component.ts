import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Order, RestaurantBranch, OrderStatus, OrderType } from 'src/app/models/classes';
import { Store } from '@ngrx/store';
import { RootStoreState, RestaurantStoreSelectors, OrderStoreActions, OrderStoreSelectors } from 'src/app/root-store';
import { ModalController } from '@ionic/angular';
import { tap, map } from 'rxjs/operators';
import { BranchSelectorModal } from 'src/app/shared/modals/branch-selector/branch-selector.component';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {

  showDetailsAll = false;

  orders$: Observable<Order[]>;
  tabChange$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedBranch$: Observable<RestaurantBranch>;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // this.store$.dispatch(OrderStoreActions.loadAdminOrders({ branchId: 1 }));
    this.selectedBranch$ = this.store$.select(RestaurantStoreSelectors.getSelectedBranch)
      .pipe(tap((branch: RestaurantBranch) => {
        this.store$.dispatch(OrderStoreActions.loadAdminOrders({ branchId: branch.id }));
      }));

    this.orders$ = combineLatest([
      this.tabChange$,
      this.store$.select(OrderStoreSelectors.getAdminNewOrders),
      this.store$.select(OrderStoreSelectors.getAdminCurrentOrders)])
      .pipe(
        map(([tab, newOrders, curOrders]) => {
          if (tab === 0) {
            return newOrders ? newOrders : [];
          }

          const orders = newOrders.concat(curOrders);
          if (tab !== 0 && (!orders || orders.length === 0)) { return []; }

          if (tab === 1) {
            return orders
              .filter(o => ![OrderStatus.CANCELLED, OrderStatus.COMPLETE].includes(o.status)
              );
          } else if (tab === 2) {
            return orders
              .filter(o => o.orderType === OrderType.DELIVERY &&
                ![OrderStatus.CANCELLED, OrderStatus.COMPLETE].includes(o.status)
              );
          } else if (tab === 3) {
            return orders
              .filter(o => o.orderType === OrderType.PICKUP &&
                ![OrderStatus.CANCELLED, OrderStatus.COMPLETE].includes(o.status)
              );
          } else {
            return orders
              .filter(o => [OrderStatus.CANCELLED, OrderStatus.COMPLETE].includes(o.status));
          }
        }));
  }

  segmentChanged(tab: number) {
    this.tabChange$.next(tab);
  }

  // cancelOrder(order: Order) {
  //   if (!order) { return; }
  //   this.store$.dispatch(OrderStoreActions.cancelOrder({ order }));
  // }

  // completeOrder(order: Order) {
  //   if (!order) { return; }
  //   this.store$.dispatch(OrderStoreActions.completeOrder({ order }));
  // }

  updateOrderStatus(order: Order) {
    if (order.status === OrderStatus.PREPARING) {
      this.store$.dispatch(OrderStoreActions.prepareOrder({ order }));

    } else {
      this.store$.dispatch(OrderStoreActions.updateOrderStatus({ order }));
    }
  }

  refreshNewOrder(event) {
    this.store$.dispatch(OrderStoreActions.loadAdminNewOrders({ branchId: 1 }));
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async openChangeBranch() {
    const modal = await this.modalCtrl.create({
      component: BranchSelectorModal,
      componentProps: {
      },
      swipeToClose: false,
      // presentingElement: this.nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
