import { Action, createReducer, on } from '@ngrx/store';
import { ShoppingCartState } from './shopping-cart-state';
import * as CartActions from './shopping-cart-actions';
import { CartItem } from 'src/app/models/classes';
// import { OrderStatus } from 'src/app/models/classes';

export const initialState: ShoppingCartState = {
    cart: null,
    cartItems: [],
    cartPrice: 0,
    // orders: [],
    // currentOrderStatus: 0,
    isProcessing: false,
    // isLoading: false,
    error: null
};

export const addCartItem = (currentItems: CartItem[], newItem: CartItem): CartItem[] => {
    newItem.id = currentItems.length + 1;
    return currentItems.concat([newItem]);
};

const _cartReducer = createReducer(
    initialState,

    on(CartActions.addItem, (state, { item }) => ({
        ...state,
        cartItems: addCartItem(state.cartItems, item),
        cartPrice: state.cartItems.concat([item]).reduce((a, b) => +a + +b.itemPrice, 0)
    })),

    // on(CartActions.removeItem, (state, { itemId }) => ({
    //     ...state,
    //     cartItems: state.cartItems.filter(x => x.item.id !== itemId),
    //     cartPrice: state.cartItems.filter(x => x.item.id !== itemId).reduce((a, b) => +a + +b.itemPrice, 0)
    // })),

    on(CartActions.removeItem, (state, { cartItemId }) => ({
        ...state,
        cartItems: state.cartItems.filter(x => x.id !== cartItemId),
        cartPrice: state.cartItems.filter(x => x.id !== cartItemId).reduce((a, b) => +a + +b.itemPrice, 0)
    })),

    on(CartActions.updateAmount, (state, { item }) => ({
        ...state,
        cartItems: state.cartItems.map(s => [item].find(x => x.item.id === s.item.id) || s)
    })),

    on(CartActions.updateCart, (state, { items }) => ({
        ...state,
        cartItems: items,
        cartPrice: items.reduce((a, b) => +a + +b.itemPrice, 0)
    })),

    on(CartActions.payCart, state => ({
        ...state,
        isProcessing: true
    })),

    on(CartActions.payCartSuccess, state => ({
        ...state,
        isProcessing: false,
        cartItems: [],
        // orders: state.orders.concat([paidOrder])
    })),

    on(CartActions.payCartFailure, (state, { error }) => ({
        ...state,
        isProcessing: false,
        error
    })),

    on(CartActions.clearCart, state => ({
        ...state,
        cartItems: [],
        cartPrice: 0
    })),

    // on(CartActions.loadOrders, state => ({
    //     ...state,
    //     isLoading: true
    // })),

    // on(CartActions.loadOrderSuccess, (state, { orders }) => ({
    //     ...state,
    //     isLoading: false,
    //     orders
    // })),

    // on(CartActions.loadOrdersFailure, (state, { error }) => ({
    //     ...state,
    //     isLoading: false,
    //     error
    // })),

    // on(CartActions.prepareOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(CartActions.prepareOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     currentOrderStatus: OrderStatus.PREPARING,
    //     orders: state.orders.map(o => [order].find(x => x.orderId === o.orderId) || o)
    // })),

    // on(CartActions.prepareOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(CartActions.readyOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(CartActions.readyOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     currentOrderStatus: OrderStatus.READY,
    //     orders: state.orders.map(o => [order].find(x => x.orderId === o.orderId) || o)
    // })),

    // on(CartActions.readyOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(CartActions.deliverOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(CartActions.deliverOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     currentOrderStatus: OrderStatus.DELIVERING,
    //     orders: state.orders.map(o => [order].find(x => x.orderId === o.orderId) || o)
    // })),

    // on(CartActions.deliverOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(CartActions.completeOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(CartActions.completeOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     currentOrderStatus: OrderStatus.COMPLETE,
    //     orders: state.orders.map(o => [order].find(x => x.orderId === o.orderId) || o)
    // })),

    // on(CartActions.completeOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // }))
)


export function cartReducer(state: ShoppingCartState | undefined, action: Action) {
    return _cartReducer(state, action);
}
