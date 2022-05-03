import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Booking, BookingSlot } from '../models/booking';
import { environment } from 'src/environments/environment';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService
  ) { }

  getUserBookings(userUid: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingAPI() + '/user/' + userUid + '/' + this.restaurantId());
  }

  getAdminBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingAPI() + '/admin/' + this.restaurantId());
  }

  getBookingSlots(branchId: number, date: string): Observable<BookingSlot[]> {
    //return of(this.initSlotsData());
    if (!date) {
      date = new Date().toISOString().substring(0, 10);
    }
    return this.http.get<BookingSlot[]>(this.bookingAPI() + '/slots/' + branchId + '/?date=' + date);
  }

  addBooking(booking: Booking, isAdmin: boolean = false): Observable<Booking> {
    return this.http.post<Booking>(this.bookingAPI() + '/?isAdmin=' + isAdmin, booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(this.bookingAPI(), booking);
  }

  cancelBooking(bookingId: number): Observable<Booking> {
    return this.http.put<Booking>(this.bookingAPI() + '/cancel/' + bookingId, null);
  }

  confirmBooking(bookingId: number): Observable<Booking> {
    return this.http.put<Booking>(this.bookingAPI() + '/confirm/' + bookingId, null);
  }

  removeBooking(bookingId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.bookingAPI() + '/' + bookingId);
  }

  initSlotsData() {
    const slots: BookingSlot[] = [];
    let id = 1;
    for (let hours = 11; hours < 14; hours++) {
      [0, 30].forEach(minutes => {
        slots.push(new BookingSlot(id, hours, minutes))
        id++;
      });
    }

    for (let hours = 17; hours < 22; hours++) {
      [0, 30].forEach(minutes => {
        slots.push(new BookingSlot(id, hours, minutes));
        id++;
      });
    }

    return slots;
  }

  getBookingOccasions() {
    return [
      { name: 'Birthday', iconClass: 'fal fa-birthday-cake' },
      { name: 'Anniversary', iconClass: 'fal fa-calendar-alt' },
      { name: 'Date', iconClass: 'fal fa-glass-martini-alt' },
      { name: 'Business', iconClass: 'fal fa-briefcase' },
      { name: 'Special Occasion', iconClass: 'fal fa-calendar-star' },
    ];

  }

  private bookingAPI() {
    return environment.foodApiUrl + '/booking';
  }

  private restaurantId() {
    return this.restaurantService.getRestaurantId();
  }

}
