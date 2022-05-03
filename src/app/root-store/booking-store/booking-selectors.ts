import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { BookingState } from './booking-state';
import * as moment from 'moment';
import { Booking, BookingSlot } from 'src/app/models/booking';

export const selectBookingFeature = (state: AppState) => {
    return state.bookingStore;
};

export const getBookingSlots = createSelector(
    selectBookingFeature,
    (state: BookingState) => state.slots
);

export const getAvailableSlots = createSelector(
    selectBookingFeature,
    (state: BookingState) => state.slots.filter(s => !s.unavailable)
);

// export const getAdminPastBookings = createSelector(
//     selectBookingFeature,
//     (state: BookingState) => state.adminPastBookings
// );

export const getAdminBookings = createSelector(
    selectBookingFeature,
    (state: BookingState) => state.adminBookings
);

export const getBookingById = createSelector(
    selectBookingFeature,
    (state: BookingState, { bookingId }) => state.userBookings.find(b => b.id === bookingId)
);

export const getTempBooking = createSelector(
    selectBookingFeature,
    (state: BookingState) => state.tempBooking
);

export const getUserBookings = createSelector(
    selectBookingFeature,
    getBookingSlots,
    (state: BookingState, slots: BookingSlot[]) => {
        if (!slots || !slots.length || !state.userBookings.length) { return []; }
        return state.userBookings.map(b => {
            const slot = slots.find(s => s.id === b.slotId);
            b.time = slot.time;
            return b;
        });
    }
);

export const getUserActiveBookings = createSelector(
    getUserBookings,
    (bookings: Booking[]) => bookings.filter(b => moment().diff(b.date, 'days') <= 0 && !b.cancelled)
);

export const getUserPastBookings = createSelector(
    getUserBookings,
    getUserActiveBookings,
    (bookings: Booking[], activeBookings: Booking[]) => bookings.filter(b => !activeBookings.map(ab => ab.id).includes(b.id))
);
