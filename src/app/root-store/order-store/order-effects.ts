import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';
import * as OrderActions from './order-actions';
import { Order } from 'src/app/models/classes';
import { OrderService } from 'src/app/services/order.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStoreSelectors } from '../user-store/user-index';
import { CartStoreActions } from '../shopping-cart-store/shopping-cart-index';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Injectable()
export class OrderStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<RootStoreState.AppState>,
        private orderService: OrderService,
        private notiService: NotificationService,
        private router: Router,
        private modalCtrl: ModalController
    ) { }

    payOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.payOrder),
            mergeMap(action => {
                this.notiService.presentLoading('Processing order...');
                return this.orderService.placeOrder(action.order)
                    .pipe(
                        map((result: boolean) => {
                            this.notiService.closeLoading();
                            this.store$.dispatch(CartStoreActions.clearCart());
                            this.modalCtrl.dismiss({ dismissed: true });
                            this.router.navigate(['tabs/order']);
                            return OrderActions.paySuccess();
                        }),
                        catchError(error => {
                            console.log(error);
                            this.notiService.closeLoading();
                            return of(OrderActions.payFailure({ error }));
                        })
                    );
            })
        )
    );

    loadUserOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadUserOrders),
            withLatestFrom(this.store$.select(UserStoreSelectors.getUserUid)),
            mergeMap(([action, userUid]) => {
                return this.orderService.getUserOrders(userUid)
                    .pipe(
                        map((userOrders: Order[]) => OrderActions.loadUserOrdersSuccess({ userOrders })),
                        catchError(error => of(OrderActions.loadUserOrdersFailure({ error })))
                    );
            })
        )
    );

    loadUserNewOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadUserNewOrders),
            withLatestFrom(this.store$.select(UserStoreSelectors.getUserUid)),
            mergeMap(([action, userUid]) => {
                return this.orderService.getUserNewOrders(userUid)
                    .pipe(
                        map((userOrders: Order[]) => OrderActions.loadUserNewOrdersSuccess({ userNewOrders: userOrders })),
                        catchError(error => of(OrderActions.loadUserNewOrdersFailure({ error })))
                    );
            })
        )
    );

    loadUserPastOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadUserPastOrders),
            withLatestFrom(this.store$.select(UserStoreSelectors.getUserUid)),
            mergeMap(([action, userUid]) => {
                return this.orderService.getUserPastOrder(userUid)
                    .pipe(
                        map((userOrders: Order[]) => OrderActions.loadUserPastOrdersSuccess({ userPastOrders: userOrders })),
                        catchError(error => of(OrderActions.loadUserPastOrdersFailure({ error })))
                    );
            })
        )
    );

    loadAdminOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadAdminOrders),
            mergeMap(action => {
                return this.orderService.getAdminOrders(action.branchId)
                    .pipe(
                        map((adminOrders: Order[]) => OrderActions.loadAdminOrdersSuccess({ adminOrders })),
                        catchError(error => of(OrderActions.loadAdminOrdersFailure({ error })))
                    );
            })
        )
    );

    loadAdminNewOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadAdminNewOrders),
            mergeMap(action => {
                return this.orderService.getAdminNewOrders(action.branchId)
                    .pipe(
                        map((adminOrders: Order[]) => OrderActions.loadAdminNewOrdersSuccess({ adminNewOrders: adminOrders })),
                        catchError(error => of(OrderActions.loadAdminNewOrdersFailure({ error })))
                    );
            })
        )
    );

    loadAdminCurrentOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadAdminCurrentOrders),
            mergeMap(action => {
                return this.orderService.getAdminCurrentOrders(action.branchId)
                    .pipe(
                        map((adminOrders: Order[]) => OrderActions.loadAdminCurrentOrdersSuccess({ adminCurrentOrders: adminOrders })),
                        catchError(error => of(OrderActions.loadAdminCurrentOrdersFailure({ error })))
                    );
            })
        )
    );

    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.updateOrderStatus),
            // withLatestFrom(this.store$.select(UserStoreSelectors.getUsername)),
            mergeMap(action => {
                // action.order.lastModifiedBy = username;
                this.notiService.presentLoading('Updating order...');
                return this.orderService.updateOrderStatus(action.order)
                    .pipe(
                        map((order: Order) => {
                            this.notiService.closeLoading();
                            return OrderActions.updateOrderStatusSuccess({ order });
                        }),
                        catchError(error => {
                            this.notiService.closeLoading();
                            return of(OrderActions.updateOrderStatusFailure({ error }));
                        })
                    );
            })
        )
    );

    prepareOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.prepareOrder),
            // withLatestFrom(this.store$.select(UserStoreSelectors.getUsername)),
            mergeMap(action => {
                // action.order.lastModifiedBy = username;
                this.notiService.presentLoading('Updating order...');
                return this.orderService.updateOrderStatus(action.order)
                    .pipe(
                        map((order: Order) => {
                            this.notiService.closeLoading();
                            return OrderActions.prepareOrderSuccess({ order });
                        }),
                        catchError(error => {
                            this.notiService.closeLoading();
                            return of(OrderActions.prepareOrderFailure({ error }));
                        })
                    );
            })
        )
    );

    // readyOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(OrderActions.readyOrder),
    //         mergeMap(action => {
    //             return this.orderService.readyOrder(action.orderId)
    //                 .pipe(
    //                     map((order: Order) => OrderActions.readyOrderSuccess({ order })),
    //                     catchError(error => of(OrderActions.readyOrderFailure({ error })))
    //                 );
    //         })
    //     )
    // );

    // deliverOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(OrderActions.deliverOrder),
    //         mergeMap(action => {
    //             return this.orderService.deliverOrder(action.orderId)
    //                 .pipe(
    //                     map((order: Order) => OrderActions.deliverOrderSuccess({ order })),
    //                     catchError(error => of(OrderActions.deliverOrderFailure({ error })))
    //                 );
    //         })
    //     )
    // );

    // completeOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(OrderActions.completeOrder),
    //         mergeMap(action => {
    //             return this.orderService.completeOrder(action.order)
    //                 .pipe(
    //                     map((order: Order) => OrderActions.completeOrderSuccess({ order })),
    //                     catchError(error => of(OrderActions.completeOrderFailure({ error })))
    //                 );
    //         })
    //     )
    // );

    // cancelOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(OrderActions.cancelOrder),
    //         mergeMap(action => {
    //             return this.orderService.cancelOrder(action.order)
    //                 .pipe(
    //                     map((order: Order) => OrderActions.cancelOrderSuccess({ order })),
    //                     catchError(error => of(OrderActions.cancelOrderFailure({ error })))
    //                 );
    //         })
    //     )
    // );
}