import { Injectable } from '@angular/core';
import { ShoppingCart, CartItem, Order, OrderStatus, User, OrderType } from '../models/classes';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cartSubject = new Subject<ShoppingCart>();
  private existingCart: ShoppingCart = new ShoppingCart();

  constructor(
    private db: AngularFirestore
  ) { }

  addToCart(item: CartItem) {
    // this.existingCart.cartItems.push(item);
    // this.cartSubject.next(this.existingCart);
  }

  getCart() {
    return of(this.existingCart);
  }

  clearCart() {
    this.existingCart = new ShoppingCart();
  }

  payCart(cartItems: CartItem[], cartPrice: number, user: User, deliveryPrice: number = 0) {
  //   const batch = this.db.firestore.batch();
  //   const timestamp = new Date().getTime();
  //   const orderId = '' + firebase.firestore.FieldValue.increment(1);
  //   // const orderRef = this.db.collection('orders').doc<Order>('AL-' + user.uid);
  //   const orderRef = this.db.doc<Order>('orders/' + orderId).ref;

  //   const addedOder = {
  //     id: +orderId,
  //     orderPrice: cartPrice,
  //     // items: cartItems,
  //     deliveryPrice,
  //     orderType: OrderType.PICKUP,
  //     status: OrderStatus.PREPARING,
  //     customer: {
  //       id: user.uid,
  //       email: user.email,
  //       address: user.address,
  //       name: user.displayName,
  //       mobile: user.mobile
  //     },
  //     restaurantId: 1,
  //     createdOn: new Date(),
  //     modifiedOn: new Date(),
  //   } as Order;

  //   // this.db.doc<Order>('orders/' + user.uid + '-' + timestamp).set(addedOder, { merge: true });

  //   batch.set(orderRef, addedOder, { merge: true });

  //   cartItems.forEach(cartItem => {
  //     const orderItem = cartItem.item;
  //     const itemRef = this.db
  //       .collection('orders').doc(orderId)
  //       .collection('orderItems').doc(orderItem.title)
  //       .ref;

  //     batch.set(itemRef, {
  //       amount: cartItem.amount,
  //       item: cartItem.item
  //       // title: orderItem.title,
  //       // itemId: orderItem.id,
  //       // categoryId: orderItem.categoryId,
  //       // extrasPrice: orderItem.extrasPrice,
  //       // removes: orderItem.removes,
  //       // price: orderItem.price
  //     });

  //   });
  //   batch.commit();

  //   addedOder.items = cartItems;
    // return of(addedOder);
    return of();
  }
}
