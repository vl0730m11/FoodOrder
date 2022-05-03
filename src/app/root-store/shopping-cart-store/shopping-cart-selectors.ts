import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { ShoppingCartState } from './shopping-cart-state';
import { ShoppingCart } from 'src/app/models/classes';

export const selectCartFeature = (state: AppState) => {
    return state.shoppingCartStore;
};

export const getLoadingStatus = createSelector(
    selectCartFeature,
    (state: ShoppingCartState) => state.isProcessing
);

// export const getHistoryOrders = createSelector(
//     selectCartFeature,
//     (state: ShoppingCartState) => state.orders ? state.orders.filter(o => o.status !== 0) : []
// );

// export const getUpcomingOrders = createSelector(
//     selectCartFeature,
//     (state: ShoppingCartState) => state.orders ? state.orders.filter(o => o.status === 0) : []
// );

export const getCartItems = createSelector(
    selectCartFeature,
    (state: ShoppingCartState) => state.cartItems
);

export const getCartTotalPrice = createSelector(
    selectCartFeature,
    (state: ShoppingCartState) => state.cartPrice
    // {
    //     if (!state.cartItems || state.cartItems.length == 0) return 0;
    //     let totalPrice = 0;
    //     state.cartItems.forEach(x => totalPrice += x.itemPrice);
    //     return totalPrice
    // }
);

export const getShoppingCart = createSelector(
    getCartItems,
    (cartItems) => { return <ShoppingCart>{ cartItems: cartItems } }
);
