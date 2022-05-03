import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartItem, CreditCard, User, ShoppingCart, OrderType, Order, OrderStatus } from 'src/app/models/classes';
import { LocationTimeComponent } from '../../../components/location-time/location-time.component';
import { ShoppingCartComponent } from '../../../components/shopping-cart/shopping-cart.component';
import { PaymentMethodComponent } from '../../../components/payment-method/payment-method.component';
import { Store } from '@ngrx/store';
import {
  RootStoreState, RestaurantStoreActions, CartStoreSelectors,
  UserStoreSelectors, OrderStoreActions, CartStoreActions
} from 'src/app/root-store';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { PaymentSelectorModal } from '../../payment-selector/payment-selector.component';
import { BranchSelectorModal } from '../../branch-selector/branch-selector.component';
import { PaymentModal } from '../payment-modal/payment-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss'],
})
export class ShoppingCartModal implements OnInit {

  cartItems$: Observable<CartItem[]>;
  branchs$: Observable<CartItem[]>;

  selectedCard$: Observable<CreditCard>;
  selectedCard: CreditCard;

  cartPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartPrice: number = 0;
  deliveryFee: number = 0;

  currentUser$: Observable<User>;

  @Input() nativeE1;

  @ViewChild('location', { static: false }) location: LocationTimeComponent;
  @ViewChild('cart', { static: false }) cart: ShoppingCartComponent;
  @ViewChild('payment', { static: false }) payment: PaymentMethodComponent;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
    private router: Router,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.store$.dispatch(RestaurantStoreActions.selectBranch({ branchId: 1 }));
    this.cartItems$ = this.store$.select(CartStoreSelectors.getCartItems)
      .pipe(
        map(items => {
          const cart = new ShoppingCart();
          cart.cartItems = items;
          this.cartPrice$.next(cart.cartPrice);
          this.cartPrice = cart.cartPrice;
          return items;
        })
      );

    this.currentUser$ = this.store$.select(UserStoreSelectors.getUser);

    this.selectedCard$ = this.store$.select(UserStoreSelectors.getSelectedCard)
      .pipe(tap(selectedCard => this.selectedCard = selectedCard));
  }

  async openChangePayment() {
    const modal = await this.modalCtrl.create({
      component: PaymentSelectorModal,
      componentProps: {
        selectedCard: this.selectedCard,
        nativeE1: this.nativeE1
      },
      swipeToClose: false,
      // presentingElement: this.nativeE1
    });

    return await modal.present();
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

  pay() {
    const order = this.getOrderDetails();
    this.store$.dispatch(OrderStoreActions.payOrder({ order }));
    // this.store$.dispatch(CartStoreActions.payCart({ items: this.cartItems, cartPrice: this.totalPrice }));
  }

  async goToPayment() {
    const nav = document.querySelector('ion-nav');
    nav.push(PaymentModal);
  }

  isOkToPay() {
    if (!this.payment || !this.location || !this.cart) { return false; }
    return this.payment.isValid && this.location.isValid && this.cart.isValid;
  }

  onValueChange(cartItems: CartItem[]) {
    if (!cartItems) { return; }

    const items = cartItems.map(x => {
      const item = new CartItem();
      item.item = x.item;
      item.amount = x.amount;
      return item;
    });

    this.store$.dispatch(CartStoreActions.updateCart({ items }));
  }

  clearCart() {
    this.store$.dispatch(CartStoreActions.clearCart());
  }

  onAddItemClick() {
    this.close();
    // this.navController.navigateBack(['tabs/menu']);
    // this.router.navigate(['tabs/menu']);
  }

  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onChangeOrderType(orderType: OrderType) {
    this.deliveryFee = orderType === OrderType.DELIVERY ? 5 : 0;
  }

  private getOrderDetails() {
    const order = new Order();
    order.branchId = this.location.selectedBranch.id;
    order.cartItems = this.cart.cartItems;

    // order.items = this.cart.cartItems.map(item => {
    //   const orderItem = new OrderItem();
    //   orderItem.id = 0;
    //   orderItem.orderId = 0;
    //   orderItem.menuItemId = item.item.id;
    //   orderItem.title = item.item.title;
    //   orderItem.price = item.item.price;
    //   orderItem.extraPrice = item.item.extraPrice;
    //   orderItem.extras = item.item.extras;
    //   orderItem.removes = item.item.removes;
    //   orderItem.amount = item.amount;
    //   return orderItem;
    // });

    order.orderType = this.location.diningOption;
    order.orderPrice = this.cart.cartPrice;
    order.orderNote = this.cart.orderNote;
    order.deliveryNote = order.orderType === OrderType.DELIVERY ? this.location.deliveryNote : '',
      order.deliveryPrice = this.deliveryFee;
    order.tips = this.cart.tips;
    order.status = OrderStatus.NONE;
    order.restaurantId = this.location.selectedBranch.restaurantId;
    order.customer = {
      id: this.location.user.uid,
      email: this.location.user.email,
      address1: order.orderType === OrderType.DELIVERY ? this.location.addressLine1 : '',
      address2: order.orderType === OrderType.DELIVERY ? this.location.addressLine2 : '',
      address3: order.orderType === OrderType.DELIVERY ? this.location.addressLine3 : '',
      name: this.location.user.displayName,
      mobile: this.location.user.mobile,
      imageUrl: this.location.user.photoURL,
      creditCard: this.selectedCard.id,
      stripeId: this.location.user.stripeId
    };

    const today = new Date();
    let deliveryTime: string; // moment.Moment;

    if (this.location.deliveryTime === '0') {
      deliveryTime = moment(new Date(), 'hh:mm A')
        .add(30, 'minutes').format();
    } else {
      const time = this.location.deliveryTime;
      deliveryTime = moment(time, 'hh:mm A').format();
    }
    console.log(deliveryTime);
    order.deliveryTime = deliveryTime;
    // new Date(today.getFullYear(), today.getMonth(), today.getDate(), deliveryTime.hours(), deliveryTime.minutes());
    console.log(order);
    return order;
  }

}
