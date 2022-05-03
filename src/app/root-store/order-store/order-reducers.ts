
import { Action, on, createReducer } from '@ngrx/store';
import * as OrderActions from './order-actions';

import { OrderState } from './order-state';
import { OrderStatus } from 'src/app/models/classes';

export const initialState: OrderState = {
    userNewOrders: [],
    userPastOrders: [],
    adminNewOrders: [],
    adminCurrentOrders: [],
    isProcessing: false,
    isLoading: false,
    error: null
};

const _orderReducer = createReducer(
    initialState,

    // on(CartActions.payCartSuccess, (state, { paidOrder }) => ({
    //     ...state,
    //     userOrders: state.userOrders.concat([paidOrder])
    // })),


    on(OrderActions.loadUserOrders, state => ({
        ...state,
        isLoading: true
    })),

    on(OrderActions.loadUserOrdersSuccess, (state, { userOrders }) => ({
        ...state,
        isLoading: false,
        userNewOrders: userOrders.filter(o => ![OrderStatus.COMPLETE, OrderStatus.CANCELLED].includes(o.status)),
        userPastOrders: userOrders.filter(o => [OrderStatus.COMPLETE, OrderStatus.CANCELLED].includes(o.status))
    })),

    on(OrderActions.loadUserNewOrdersSuccess, (state, { userNewOrders }) => ({
        ...state,
        isLoading: false,
        userNewOrders
    })),

    on(OrderActions.loadUserPastOrdersSuccess, (state, { userPastOrders }) => ({
        ...state,
        isLoading: false,
        userPastOrders
    })),

    on(OrderActions.loadUserOrdersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(OrderActions.loadAdminOrders, state => ({
        ...state,
        isLoading: true
    })),

    on(OrderActions.loadAdminOrdersSuccess, (state, { adminOrders }) => ({
        ...state,
        isLoading: false,
        adminNewOrders: adminOrders.filter(o => o.status === OrderStatus.NONE),
        adminCurrentOrders: adminOrders.filter(o => o.status !== OrderStatus.NONE),
    })),

    on(OrderActions.loadAdminOrdersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(OrderActions.loadAdminNewOrdersSuccess, (state, { adminNewOrders }) => ({
        ...state,
        isLoading: false,
        adminNewOrders
    })),

    on(OrderActions.loadAdminNewOrdersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(OrderActions.loadAdminCurrentOrdersSuccess, (state, { adminCurrentOrders }) => ({
        ...state,
        isLoading: false,
        adminCurrentOrders
    })),

    on(OrderActions.loadAdminCurrentOrdersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(OrderActions.prepareOrder, state => ({
        ...state,
        isProcessing: true,
    })),

    on(OrderActions.prepareOrderSuccess, (state, { order }) => ({
        ...state,
        isProcessing: false,
        adminNewOrders: state.adminNewOrders.filter(o => o.id !== order.id),
        adminCurrentOrders: state.adminCurrentOrders.concat([order])
        // adminNewOrders: state.adminNewOrders.filter(o => o.id !== order.id)
        // adminOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    })),

    on(OrderActions.prepareOrderFailure, (state, { error }) => ({
        ...state,
        isProcessing: false,
        error
    })),

    on(OrderActions.updateOrderStatus, state => ({

        ...state,
        isProcessing: true,
    })),

    on(OrderActions.updateOrderStatusSuccess, (state, { order }) => ({
        ...state,
        isProcessing: false,
        adminCurrentOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    })),

    on(OrderActions.updateOrderStatusFailure, (state, { error }) => ({
        ...state,
        isProcessing: false,
        error
    })),

    // on(OrderActions.readyOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(OrderActions.readyOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     // currentOrderStatus: OrderStatus.READY,
    //     adminOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    // })),

    // on(OrderActions.readyOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(OrderActions.deliverOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(OrderActions.deliverOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     // currentOrderStatus: OrderStatus.DELIVERING,
    //     adminOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    // })),

    // on(OrderActions.deliverOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(OrderActions.completeOrder, state => ({
    //     ...state,
    //     isProcessing: true
    // })),

    // on(OrderActions.completeOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     // currentOrderStatus: OrderStatus.COMPLETE,
    //     adminOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    // })),

    // on(OrderActions.completeOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // })),

    // on(OrderActions.cancelOrder, state => ({
    //     ...state,
    //     isProcessing: true,
    //     error: ''
    // })),

    // on(OrderActions.cancelOrderSuccess, (state, { order }) => ({
    //     ...state,
    //     isProcessing: false,
    //     adminOrders: state.adminCurrentOrders.map(o => [order].find(x => x.id === o.id) || o)
    // })),

    // on(OrderActions.cancelOrderFailure, (state, { error }) => ({
    //     ...state,
    //     isProcessing: false,
    //     error
    // }))
)

export function orderReducer(state: OrderState | undefined, action: Action) {
    return _orderReducer(state, action);
}



