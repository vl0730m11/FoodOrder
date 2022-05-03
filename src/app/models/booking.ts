import { Time } from '@angular/common';
import { CustomerSummary } from './classes';

export class Booking {
    id: number;
    slotId: number;
    slot?: BookingSlot;
    customerId: string;
    customerName: string;
    customer?: CustomerSummary;
    mobile: string;
    guestNo: number;
    restaurantId: number;
    branchId: number;
    branchName?: string;

    confirmed: boolean = false; // default as false, send confirmation email/sms 24 hours before the booking date

    createdBy?: string;
    createdOn?: Date;
    modifiedBy?: string;
    modifiedOn?: Date;

    tableNo?: string;
    cancelled?: boolean = false;
    notes?: string;
    date?: string; // UTC (iso string)

    displayDate?: string;
    // get displayDate() { // for display only
    //     return new Date(this.date);
    // }

    time?: Time; // for display only
    occasion?: string;
}

export class BookingSlot {
    // id: number;
    time?: Time;
    period: string; // 'am', 'pm'
    date: Date;
    capacity: number; // max capacity of restaurant for 1 slot
    restaurantId: number;
    unavailable?: boolean; // to be check between booking_guestNo & slot_capacity
    visible?: boolean; // to be set by restaurant (eg: restaurant doesnt want bookings for fri,sat night peak hours)
    tableNo?: number; // number of table available for restaurant
    availableSeats: number;

    constructor(public id: number, public hours: number, public minutes: number) {
        this.time = { hours, minutes };
        this.unavailable = false;
        this.capacity = 50;
        this.restaurantId = 1;
        this.visible = true;
        this.period = hours < 12 ? 'am' : 'pm';
    }
}

export enum BookingOccasion {
    Unknown = 0,
    Birthday = 1,
    Anniversary = 2,
    Date = 3,
    Business = 4,
    SpecialOccasion = 5
}