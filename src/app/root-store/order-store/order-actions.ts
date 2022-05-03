import { createAction, props } from '@ngrx/store';
import { Order, OrderStatus } from 'src/app/models/classes';

export enum OrderActionTypes {

    USER_ORDERS_REQUEST = '[Order] Load Orders',
    USER_ORDERS_SUCCESS = '[Order] Load Orders Success',
    USER_ORDERS_FAILURE = '[Order] Load Orders Failure',

    USER_NEW_ORDERS_REQUEST = '[Order] Load New Orders',
    USER_NEW_ORDERS_SUCCESS = '[Order] Load New Orders Success',
    USER_NEW_ORDERS_FAILURE = '[Order] Load New Orders Failure',

    USER_PAST_ORDERS_REQUEST = '[Order] Load Past Orders',
    USER_PAST_ORDERS_SUCCESS = '[Order] Load Past Orders Success',
    USER_PAST_ORDERS_FAILURE = '[Order] Load Past Orders Failure',

    ADMIN_ORDERS_REQUEST = '[Order] Load Admin Orders',
    ADMIN_ORDERS_SUCCESS = '[Order] Load Admin Orders Success',
    ADMIN_ORDERS_FAILURE = '[Order] Load Admin Orders Failure',

    ADMIN_NEW_ORDERS_REQUEST = '[Order] Load New Admin Orders',
    ADMIN_NEW_ORDERS_SUCCESS = '[Order] Load New Admin Orders Success',
    ADMIN_NEW_ORDERS_FAILURE = '[Order] Load New Admin Orders Failure',

    ADMIN_CURRENT_ORDERS_REQUEST = '[Order] Load Current Admin Orders',
    ADMIN_CURRENT_ORDERS_SUCCESS = '[Order] Load Current Admin Orders Success',
    ADMIN_CURRENT_ORDERS_FAILURE = '[Order] Load Current Admin Orders Failure',

    PAY_ORDER = '[Order] Pay',
    PAY_ORDER_SUCCESS = '[Order] Pay Success',
    PAY_ORDER_FAILURE = '[Order] Pay Failure',

    CANCEL_ORDER = '[Order] Cancel',
    CANCEL_ORDER_SUCCESS = '[Order] Cancel Success',
    CANCEL_ORDER_FAILURE = '[Order] Cancel Failure',

    PREPARE_ORDER = '[Order] Prepare',
    PREPARE_ORDER_SUCCESS = '[Order] Prepare Success',
    PREPARE_ORDER_FAILURE = '[Order] Prepare Failure',

    DELIVER_ORDER = '[Order] Deliver',
    DELIVER_ORDER_SUCCESS = '[Order] Deliver Success',
    DELIVER_ORDER_FAILURE = '[Order] Deliver Failure',

    ORDER_READY = '[Order] Ready',
    ORDER_READY_SUCCESS = '[Order] Ready Success',
    ORDER_READY_FAILURE = '[Order] Ready Failure',

    COMPLETE_ORDER = '[Order] Complete',
    COMPLETE_ORDER_SUCCESS = '[Order] Complete Success',
    COMPLETE_ORDER_FAILURE = '[Order] Complete Failure',

    UPDATE_STATUS = '[Order] Update Status',
    UPDATE_STATUS_SUCCESS = '[Order] Update Status Success',
    UPDATE_STATUS_FAILURE = '[Order] Update Status Failure',
}

//#region USER ORDERS
export const loadUserOrders = createAction(
    OrderActionTypes.USER_ORDERS_REQUEST,
    // props<{ userId: number }>()
);

export const loadUserOrdersSuccess = createAction(
    OrderActionTypes.USER_ORDERS_SUCCESS,
    props<{ userOrders: Order[] }>()
);

export const loadUserOrdersFailure = createAction(
    OrderActionTypes.USER_ORDERS_FAILURE,
    props<{ error: string }>()
);

export const loadUserNewOrders = createAction(
    OrderActionTypes.USER_NEW_ORDERS_REQUEST,
    // props<{ userId: number }>()
);

export const loadUserNewOrdersSuccess = createAction(
    OrderActionTypes.USER_NEW_ORDERS_SUCCESS,
    props<{ userNewOrders: Order[] }>()
);

export const loadUserNewOrdersFailure = createAction(
    OrderActionTypes.USER_NEW_ORDERS_FAILURE,
    props<{ error: string }>()
);

export const loadUserPastOrders = createAction(
    OrderActionTypes.USER_PAST_ORDERS_REQUEST,
    // props<{ userId: number }>()
);

export const loadUserPastOrdersSuccess = createAction(
    OrderActionTypes.USER_PAST_ORDERS_SUCCESS,
    props<{ userPastOrders: Order[] }>()
);

export const loadUserPastOrdersFailure = createAction(
    OrderActionTypes.USER_PAST_ORDERS_FAILURE,
    props<{ error: string }>()
);

//#endregion

//#region ADMIN ORDERS
export const loadAdminOrders = createAction(
    OrderActionTypes.ADMIN_ORDERS_REQUEST,
    props<{ branchId: number }>()
);

export const loadAdminOrdersSuccess = createAction(
    OrderActionTypes.ADMIN_ORDERS_SUCCESS,
    props<{ adminOrders: Order[] }>()
);

export const loadAdminOrdersFailure = createAction(
    OrderActionTypes.ADMIN_ORDERS_FAILURE,
    props<{ error: string }>()
);

export const loadAdminNewOrders = createAction(
    OrderActionTypes.ADMIN_NEW_ORDERS_REQUEST,
    props<{ branchId: number }>()
);

export const loadAdminNewOrdersSuccess = createAction(
    OrderActionTypes.ADMIN_NEW_ORDERS_SUCCESS,
    props<{ adminNewOrders: Order[] }>()
);

export const loadAdminNewOrdersFailure = createAction(
    OrderActionTypes.ADMIN_NEW_ORDERS_FAILURE,
    props<{ error: string }>()
);

export const loadAdminCurrentOrders = createAction(
    OrderActionTypes.ADMIN_CURRENT_ORDERS_REQUEST,
    props<{ branchId: number }>()
);

export const loadAdminCurrentOrdersSuccess = createAction(
    OrderActionTypes.ADMIN_CURRENT_ORDERS_SUCCESS,
    props<{ adminCurrentOrders: Order[] }>()
);

export const loadAdminCurrentOrdersFailure = createAction(
    OrderActionTypes.ADMIN_CURRENT_ORDERS_FAILURE,
    props<{ error: string }>()
);
//#endregion

//#region PAY ORDER
export const payOrder = createAction(
    OrderActionTypes.PAY_ORDER,
    props<{ order: Order }>()
);

export const paySuccess = createAction(
    OrderActionTypes.PAY_ORDER_SUCCESS
);

export const payFailure = createAction(
    OrderActionTypes.PAY_ORDER_FAILURE,
    props<{ error: string }>()
);
//#endregion

export const updateOrderStatus = createAction(
    OrderActionTypes.UPDATE_STATUS,
    props<{ order: Order }>()
);

export const updateOrderStatusSuccess = createAction(
    OrderActionTypes.UPDATE_STATUS_SUCCESS,
    props<{ order: Order }>()
);

export const updateOrderStatusFailure = createAction(
    OrderActionTypes.UPDATE_STATUS_FAILURE,
    props<{ error: string }>()
);


//#region CANCEL ORDER
export const cancelOrder = createAction(
    OrderActionTypes.CANCEL_ORDER,
    props<{ order: Order }>()
);

export const cancelOrderSuccess = createAction(
    OrderActionTypes.CANCEL_ORDER_SUCCESS,
    props<{ order: Order }>()
);

export const cancelOrderFailure = createAction(
    OrderActionTypes.CANCEL_ORDER_FAILURE,
    props<{ error: string }>()
);
//#endregion

//#region PREPARE ORDER
export const prepareOrder = createAction(
    OrderActionTypes.PREPARE_ORDER,
    props<{ order: Order }>()
);

export const prepareOrderSuccess = createAction(
    OrderActionTypes.PREPARE_ORDER_SUCCESS,
    props<{ order: Order }>()
);

export const prepareOrderFailure = createAction(
    OrderActionTypes.PREPARE_ORDER_FAILURE,
    props<{ error: string }>()
);
//#endregion

//#region READY ORDER
export const readyOrder = createAction(
    OrderActionTypes.ORDER_READY,
    props<{ orderId: number }>()
);

export const readyOrderSuccess = createAction(
    OrderActionTypes.ORDER_READY_SUCCESS,
    props<{ order: Order }>()
);

export const readyOrderFailure = createAction(
    OrderActionTypes.ORDER_READY_FAILURE,
    props<{ error: string }>()
);
//#endregion

//#region DELIVER ORDER
export const deliverOrder = createAction(
    OrderActionTypes.DELIVER_ORDER,
    props<{ orderId: number }>()
);

export const deliverOrderSuccess = createAction(
    OrderActionTypes.DELIVER_ORDER_SUCCESS,
    props<{ order: Order }>()
);

export const deliverOrderFailure = createAction(
    OrderActionTypes.DELIVER_ORDER_FAILURE,
    props<{ error: string }>()
);
//#endregion

//#region COMPLETE ORDER
export const completeOrder = createAction(
    OrderActionTypes.COMPLETE_ORDER,
    props<{ order: Order }>()
);

export const completeOrderSuccess = createAction(
    OrderActionTypes.COMPLETE_ORDER_SUCCESS,
    props<{ order: Order }>()
);

export const completeOrderFailure = createAction(
    OrderActionTypes.COMPLETE_ORDER_FAILURE,
    props<{ error: string }>()
);
//#endregion