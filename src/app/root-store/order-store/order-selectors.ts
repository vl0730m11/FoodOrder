import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { OrderState } from './order-state';
import { Order } from 'src/app/models/classes';

export const selectCartFeature = (state: AppState) => {
    return state.orderStore
};

export const getLoadingStatus = createSelector(
    selectCartFeature,
    (state: OrderState) => state.isLoading
);

export const getProcessStatus = createSelector(
    selectCartFeature,
    (state: OrderState) => state.isProcessing
);

// export const getUserOrders = createSelector(
//     selectCartFeature,
//     (state: OrderState) => state.userOrders ? state.userOrders.filter(o => o.hidden === 0) : []
// );

export const getUserPastOrders = createSelector(
    selectCartFeature,
    (state: OrderState) => state.userPastOrders
);

export const getUserNewOrders = createSelector(
    selectCartFeature,
    (state: OrderState) => state.userNewOrders
);

export const getAdminNewOrders = createSelector(
    selectCartFeature,
    (state: OrderState) => state.adminNewOrders
);

export const getAdminCurrentOrders = createSelector(
    selectCartFeature,
    (state: OrderState) => state.adminCurrentOrders
);

// export const getUserOrders = createSelector(
//     getUserNewOrders,
//     getUserPastOrders,
//     (newOrders: Order[], pastOrders: Order[]) => newOrders.concat(pastOrders)
// );

// export const getAdminOrders = createSelector(
//     getAdminNewOrders,
//     getAdminCurrentOrders,
//     (newOrders: Order[], currentOrders: Order[]) => newOrders.concat(currentOrders)
// );