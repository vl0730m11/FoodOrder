import { createAction, props } from '@ngrx/store';
import { BookingSlot, Booking } from 'src/app/models/booking';

export enum BookingActionTypes {

    BOOKING_SLOTS_REQUEST = '[Booking] Load Booking Slots',
    BOOKING_SLOTS_SUCCESS = '[Booking] Load Booking Slots Success',
    BOOKING_SLOTS_FAILURE = '[Booking] Load Booking Slots Failure',

    USER_BOOKINGS_REQUEST = '[Booking] Load User Bookings',
    USER_BOOKINGS_SUCCESS = '[Booking] Load User Bookings Success',
    USER_BOOKINGS_FAILURE = '[Booking] Load User Bookings Failure',

    // ADMIN_PAST_BOOKINGS_REQUEST = '[Booking] Load Past Admin Bookings',
    // ADMIN_PAST_BOOKINGS_SUCCESS = '[Booking] Load Past Admin Bookings Success',
    // ADMIN_PAST_BOOKINGS_FAILURE = '[Booking] Load Past Admin Bookings Failure',

    ADMIN_BOOKINGS_REQUEST = '[Booking] Load Admin Bookings',
    ADMIN_BOOKINGS_SUCCESS = '[Booking] Load Admin Bookings Success',
    ADMIN_BOOKINGS_FAILURE = '[Booking] Load Admin Bookings Failure',

    ADD_BOOKING_CACHED = '[Booking] Add To Cached',
    ADD_BOOKING = '[Booking] Add',
    ADD_BOOKING_SUCCESS = '[Booking] Add Success',
    ADD_BOOKING_FAILURE = '[Booking] Add Failure',

    ADD_ADMIN_BOOKING = '[Booking] Add By Admin',
    ADD_ADMIN_BOOKING_SUCCESS = '[Booking] Add By Admin Success',
    ADD_ADMIN_BOOKING_FAILURE = '[Booking] Add By Admin Failure',

    REMOVE_BOOKING = '[Booking] Remove',
    REMOVE_BOOKING_SUCCESS = '[Booking] Remove Success',
    REMOVE_BOOKING_FAILURE = '[Booking] Remove Failure',

    CANCEL_BOOKING = '[Booking] Cancel',
    CANCEL_BOOKING_SUCCESS = '[Booking] Cancel Success',
    CANCEL_BOOKING_FAILURE = '[Booking] Cancel Failure',

    UPDATE_BOOKING = '[Booking] Update',
    UPDATE_BOOKING_SUCCESS = '[Booking] Update Success',
    UPDATE_BOOKING_FAILURE = '[Booking] Update Failure',
}

export const loadBookingSlots = createAction(
    BookingActionTypes.BOOKING_SLOTS_REQUEST,
    props<{ branchId: number, date?: string }>()
);

export const loadBookingSlotsSuccess = createAction(
    BookingActionTypes.BOOKING_SLOTS_SUCCESS,
    props<{ slots: BookingSlot[] }>()
);

export const loadBookingSlotsFailure = createAction(
    BookingActionTypes.BOOKING_SLOTS_FAILURE,
    props<{ error: string }>()
);

export const loadUserBookings = createAction(
    BookingActionTypes.USER_BOOKINGS_REQUEST,
    //props<{ userId: number }>()
);

export const loadUserBookingsSuccess = createAction(
    BookingActionTypes.USER_BOOKINGS_SUCCESS,
    props<{ userBookings: Booking[] }>()
);

export const loadUserBookingsFailure = createAction(
    BookingActionTypes.USER_BOOKINGS_FAILURE,
    props<{ error: string }>()
);

// export const loadAdminPastBookings = createAction(
//     BookingActionTypes.ADMIN_PAST_BOOKINGS_REQUEST,
// );

// export const loadAdminPastBookingsSuccess = createAction(
//     BookingActionTypes.ADMIN_PAST_BOOKINGS_SUCCESS,
//     props<{ adminPastBookings: Booking[] }>()
// );

// export const loadAdminPastBookingsFailure = createAction(
//     BookingActionTypes.ADMIN_PAST_BOOKINGS_FAILURE,
//     props<{ error: string }>()
// );

export const loadAdminBookings = createAction(
    BookingActionTypes.ADMIN_BOOKINGS_REQUEST,
);

export const loadAdminBookingsSuccess = createAction(
    BookingActionTypes.ADMIN_BOOKINGS_SUCCESS,
    props<{ adminNewBookings: Booking[] }>()
);

export const loadAdminBookingsFailure = createAction(
    BookingActionTypes.ADMIN_BOOKINGS_FAILURE,
    props<{ error: string }>()
);

export const addToCached = createAction(
    BookingActionTypes.ADD_BOOKING_CACHED,
    props<{ userBooking: Booking }>()
)

export const add = createAction(
    BookingActionTypes.ADD_BOOKING,
    props<{ userBooking: Booking }>()
)

export const addSuccess = createAction(
    BookingActionTypes.ADD_BOOKING_SUCCESS,
    props<{ userBooking: Booking }>()
)

export const addFailure = createAction(
    BookingActionTypes.ADD_BOOKING_FAILURE,
    props<{ error: string }>()
)

export const addAdmin = createAction(
    BookingActionTypes.ADD_ADMIN_BOOKING,
    props<{ adminBooking: Booking }>()
)

export const addAdminSuccess = createAction(
    BookingActionTypes.ADD_ADMIN_BOOKING_SUCCESS,
    props<{ adminBooking: Booking }>()
)

export const addAdminFailure = createAction(
    BookingActionTypes.ADD_ADMIN_BOOKING_FAILURE,
    props<{ error: string }>()
)

export const remove = createAction(
    BookingActionTypes.REMOVE_BOOKING,
    props<{ bookingId: number }>()
)

export const removeSuccess = createAction(
    BookingActionTypes.REMOVE_BOOKING_SUCCESS,
    props<{ bookingId: number }>()
)

export const removeFailure = createAction(
    BookingActionTypes.REMOVE_BOOKING_FAILURE,
    props<{ error: string }>()
)

export const cancel = createAction(
    BookingActionTypes.REMOVE_BOOKING,
    props<{ bookingId: number }>()
)

export const cancelSuccess = createAction(
    BookingActionTypes.REMOVE_BOOKING_SUCCESS,
    props<{ booking: Booking }>()
)

export const cancelFailure = createAction(
    BookingActionTypes.REMOVE_BOOKING_FAILURE,
    props<{ error: string }>()
)

export const update = createAction(
    BookingActionTypes.UPDATE_BOOKING,
    props<{ booking: Booking }>()
)

export const updateSuccess = createAction(
    BookingActionTypes.UPDATE_BOOKING_SUCCESS,
    props<{ booking: Booking }>()
)

export const updateFailure = createAction(
    BookingActionTypes.UPDATE_BOOKING_FAILURE,
    props<{ error: string }>()
)