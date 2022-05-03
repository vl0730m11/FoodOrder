import { Order } from 'src/app/models/classes';
import { BookingSlot, Booking } from 'src/app/models/booking';

export class BookingState {
    userBookings: Booking[];
    adminBookings: Booking[];
    // adminPastBookings: Booking[];
    slots: BookingSlot[];
    isLoading: boolean;
    error: string;
    tempBooking: Booking;
}