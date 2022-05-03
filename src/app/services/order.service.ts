import { Injectable } from '@angular/core';
import { Order } from '../models/classes';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private orders: Order[] = [
  //   {
  //     id: 1,
  //     orderType: OrderType.PICKUP,
  //     cartItems: [
  //       {
  //         item: {
  //           id: 31,
  //           categoryId: 3,
  //           title: "Laksa (Spicy)",
  //           imageUrl: "assets/menu-photos/LAKSA.jpg",
  //           amount: null,
  //           price: 14.5,
  //           ingredients: [1, 4, 5, 6, 7, 8, 10, 11],
  //           extras: ["Broccoli", "Tofu"],
  //           removes: [],
  //         },
  //         amount: 1,
  //         itemPrice: 14.5
  //       }
  //     ] as CartItem[],
  //     orderPrice: 29,
  //     deliveryPrice: 0,
  //     tips: 0,
  //     customer: {
  //       id: 1,
  //       name: 'Trung Duong',
  //       mobile: '0420596439',
  //       address1: '1 Clarence St, Strathfield',
  //       email: 'tuantrung1512@gmail.com',
  //       imageUrl: 'https://graph.facebook.com/3039208836143448/picture?type=large',
  //       creditCard: 1
  //     },
  //     status: OrderStatus.READY,
  //     createdOn: new Date(),
  //     modifiedOn: new Date(),
  //     hidden: 0,
  //     deliveryTime: '',//;new Date(),
  //     branchId: 1,
  //     showDetails: false
  //   },
  //   {
  //     id: 2,
  //     orderType: OrderType.DELIVERY,
  //     cartItems: [
  //       {
  //         item: {
  //           id: 31,
  //           categoryId: 3,
  //           title: "Laksa (Spicy)",
  //           imageUrl: "assets/menu-photos/LAKSA.jpg",
  //           // amount: null,
  //           price: 14.5,
  //           ingredients: [1, 4, 5, 6, 7, 8, 10, 11],
  //           extras: ["Broccoli", "Tofu"],
  //           removes: [],
  //         },
  //         amount: 1,
  //         itemPrice: 14.5
  //       }
  //     ] as CartItem[],
  //     orderPrice: 29,
  //     deliveryPrice: 10,
  //     tips: 2,
  //     customer: {
  //       id: 1,
  //       name: 'Trung Duong',
  //       mobile: '0420596439',
  //       address1: '1 Clarence St, Strathfield',
  //       email: 'tuantrung1512@gmail.com',
  //       imageUrl: 'https://graph.facebook.com/3039208836143448/picture?type=large',
  //       creditCard: 1
  //     },
  //     status: OrderStatus.PREPARING,
  //     createdOn: new Date(),
  //     modifiedOn: new Date(),
  //     hidden: 0,
  //     deliveryTime: moment().format(),
  //     branchId: 1,
  //     showDetails: false
  //   },
  //   {
  //     id: 3,
  //     orderType: OrderType.DELIVERY,
  //     cartItems: [
  //       {
  //         item: {
  //           id: 31,
  //           categoryId: 3,
  //           title: "Laksa (Spicy)",
  //           imageUrl: "assets/menu-photos/LAKSA.jpg",
  //           // amount: null,
  //           price: 14.5,
  //           // ingredients: [1, 4, 5, 6, 7, 8, 10, 11],
  //           extras: ["Broccoli", "Tofu"],
  //           removes: [],
  //         },
  //         amount: 1,
  //         itemPrice: 14.5
  //       }
  //     ] as CartItem[],
  //     orderPrice: 29,
  //     deliveryPrice: 5,
  //     tips: 5,
  //     customer: {
  //       id: 1,
  //       name: 'Trung Duong',
  //       mobile: '0420596439',
  //       address1: '6 Kerrs Road, Lidcombe',
  //       // address2: '',
  //       // address3: '',
  //       email: 'tuantrung1512@gmail.com',
  //       imageUrl: 'https://graph.facebook.com/3039208836143448/picture?type=large',
  //       creditCard: 1
  //     },
  //     status: OrderStatus.COMPLETE,
  //     createdOn: new Date(),
  //     modifiedOn: new Date(),
  //     hidden: 0,
  //     deliveryTime: '',
  //     branchId: 2,
  //     showDetails: false
  //   }
  // ];

  constructor(
    private http: HttpClient,
    private restService: RestaurantService
  ) { }

  getUserOrders(userUid: string) {
    return this.http.get<Order[]>(this.orderAPI() + '/user/' + userUid + '/' + this.restService.getRestaurantId());
  }

  getUserNewOrders(userUid: string) {
    return this.http.get<Order[]>(this.orderAPI() + '/user-new/' + userUid + '/' + this.restService.getRestaurantId());
  }

  getUserPastOrder(userUid: string) {
    return this.http.get<Order[]>(this.orderAPI() + '/user-history/' + userUid + '/' + this.restService.getRestaurantId());
  }

  getAdminOrders(branchId: number) {
    return this.http.get<Order[]>(this.orderAPI() + '/admin/' + this.restService.getRestaurantId() + '/' + branchId);
  }

  getAdminNewOrders(branchId: number) {
    return this.http.get<Order[]>(this.orderAPI() + '/admin-new/' + this.restService.getRestaurantId() + '/' + branchId);
  }

  getAdminCurrentOrders(branchId: number) {
    return this.http.get<Order[]>(this.orderAPI() + '/admin-current/' + this.restService.getRestaurantId() + '/' + branchId);
  }

  placeOrder(order: Order) {
    return this.http.post<boolean>(this.orderAPI() + '/pay-order', order);
  }

  downloadReceipt(order: Order) {
    return this.http.get<any>(this.orderAPI() + '/' + order.id + '/receipt');
  }

  updateOrderStatus(order: Order) {
    // const order = this.orders.find(o => o.id === orderId);
    // order.status = OrderStatus.PREPARING;
    // return of(order);
    return this.http.put<Order>(this.orderAPI() + '/update-status/', order);
  }

  // cancelOrder(order: Order) {
  //   order.status = OrderStatus.CANCELLED;
  //   return of(order);
  // }

  // prepareOrder(orderId: number) {
  //   const order = this.orders.find(o => o.id === orderId);
  //   order.status = OrderStatus.PREPARING;
  //   return of(order);
  // }

  // readyOrder(orderId: number) {
  //   const order = this.orders.find(o => o.id === orderId);
  //   order.status = OrderStatus.READY;
  //   return of(order);
  // }

  // deliverOrder(orderId: number) {
  //   const order = this.orders.find(o => o.id === orderId);
  //   order.status = OrderStatus.DELIVERING;
  //   return of(order);
  // }

  // completeOrder(order: Order) {
  //   // let order = this.orders.find(o => o.orderId === orderId);
  //   order.status = OrderStatus.COMPLETE;
  //   return of(order);
  // }

  orderAPI() {
    return environment.foodApiUrl + '/order';
  }
}
