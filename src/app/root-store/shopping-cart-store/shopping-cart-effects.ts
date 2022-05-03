import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';
import * as CartActions from './shopping-cart-actions';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/classes';



@Injectable()
export class ShoppingCartEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<RootStoreState.AppState>,
        private cartService: CartService,
        // private notificationService: NotificationService,
        // private userService: UserService
    ) { }


    payCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.payCart),
            withLatestFrom(this.store$),
            mergeMap(([action, store]) => {
                return this.cartService.payCart(action.items, action.cartPrice, store.userStore.currentUser, 5)
                    .pipe(
                        map((paidOrder: Order) => CartActions.payCartSuccess({ paidOrder })),
                        catchError(error => of(CartActions.payCartFailure({ error })))
                    );
            })
        )
    );
}