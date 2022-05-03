
import { Action, on, createReducer } from '@ngrx/store';
import { addItemToArrayList, replaceItemInArrayList } from 'src/app/utils/utils-functions';
import * as BookingActions from './booking-actions';
import { BookingState } from './booking-state';

export const initialState: BookingState = {
    userBookings: [],
    adminBookings: [],
    // adminPastBookings: [],
    slots: [],
    isLoading: false,
    error: null,
    tempBooking: null
};

const _bookingReducer = createReducer(
    initialState,

    // on(CartActions.payCartSuccess, (state, { paidOrder }) => ({
    //     ...state,
    //     userOrders: state.userOrders.concat([paidOrder])
    // })),


    on(BookingActions.loadBookingSlots, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.loadBookingSlotsSuccess, (state, { slots }) => ({
        ...state,
        isLoading: false,
        slots
    })),

    on(BookingActions.loadBookingSlotsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(BookingActions.loadUserBookings, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.loadUserBookingsSuccess, (state, { userBookings }) => ({
        ...state,
        isLoading: false,
        userBookings
        //: userBookings
        // .map(b => {
        // const bookingObj = Object.assign(new Booking(), b);
        // bookingObj.displayDate = moment(bookingObj.date).format('L');
        // return bookingObj;)
    })),

    on(BookingActions.loadUserBookingsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // on(BookingActions.loadAdminPastBookings, state => ({
    //     ...state,
    //     isLoading: true
    // })),

    // on(BookingActions.loadAdminPastBookingsSuccess, (state, { adminPastBookings }) => ({
    //     ...state,
    //     isLoading: false,
    //     adminPastBookings
    // })),

    // on(BookingActions.loadAdminPastBookingsFailure, (state, { error }) => ({
    //     ...state,
    //     isLoading: false,
    //     error
    // })),

    on(BookingActions.loadAdminBookings, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.loadAdminBookingsSuccess, (state, { adminNewBookings }) => ({
        ...state,
        isLoading: false,
        adminBookings: adminNewBookings
    })),

    on(BookingActions.loadAdminBookingsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    on(BookingActions.addToCached, (state, { userBooking }) => ({
        ...state,
        tempBooking: userBooking
    })),

    on(BookingActions.add, state => ({
        ...state,
        tempBooking: null,
        isLoading: true
    })),

    on(BookingActions.addSuccess, (state, { userBooking }) => ({
        ...state,
        userBookings: addItemToArrayList(state.userBookings, userBooking),
        isLoading: false
    })),

    on(BookingActions.addFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(BookingActions.update, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.updateSuccess, (state, { booking }) => ({
        ...state,
        userBookings: replaceItemInArrayList(state.userBookings, booking, 'id'),
        adminBookings: replaceItemInArrayList(state.adminBookings, booking, 'id'),
        isLoading: false
    })),

    on(BookingActions.updateFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(BookingActions.remove, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.removeSuccess, (state, { bookingId }) => ({
        ...state,
        adminBookings: state.adminBookings.filter(b => b.id !== bookingId),
        isLoading: false
    })),

    on(BookingActions.removeFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(BookingActions.cancel, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingActions.cancelSuccess, (state, { booking }) => ({
        ...state,
        userBookings: state.userBookings.map(b => [booking].find(x => x.id === b.id) || b),
        adminBookings: state.adminBookings.map(b => [booking].find(x => x.id === b.id) || b),
        isLoading: false
    })),

    on(BookingActions.cancelFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    }))
);

export function bookingReducer(state: BookingState | undefined, action: Action) {
    return _bookingReducer(state, action);
}



