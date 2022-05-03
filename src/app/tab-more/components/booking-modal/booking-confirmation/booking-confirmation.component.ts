import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, combineLatest, of } from 'rxjs';
import { Booking } from 'src/app/models/booking';
import { Store } from '@ngrx/store';
import { RootStoreState, RestaurantStoreSelectors, UserStoreSelectors } from 'src/app/root-store';
import { BookingStoreSelectors, BookingStoreActions } from 'src/app/root-store/booking-store/booking-index';
import { tap, map } from 'rxjs/operators';
import { RestaurantBranch } from 'src/app/models/classes';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent implements OnInit {

  booking$: Observable<Booking>;
  branch$: Observable<RestaurantBranch>;

  slideOccasionOpts = {
    initialSlide: 0,
    spaceBetween: 1,
    centeredSlides: false,
    slidesPerView: 2.75,
    autoHeight: false
  };

  occasions = [
    { name: 'Birthday', iconClass: 'fal fa-birthday-cake' },
    { name: 'Anniversary', iconClass: 'fal fa-calendar-alt' },
    { name: 'Date', iconClass: 'fal fa-glass-martini-alt' },
    { name: 'Business', iconClass: 'fal fa-briefcase' },
    { name: 'Special Occasion', iconClass: 'fal fa-calendar-star' },
  ];

  notes: string;
  currentBooking: Booking;

  constructor(
    private modalCtrl: ModalController,
    private store$: Store<RootStoreState.AppState>
  ) { }

  ngOnInit() {
    this.booking$ = combineLatest([
      this.store$.select(RestaurantStoreSelectors.getBranches),
      this.store$.select(BookingStoreSelectors.getTempBooking),
    ]).pipe(
      map(([branches, booking]) => {
        if (booking) {
          this.currentBooking = booking;
          this.notes = booking.notes;
          this.branch$ = of(branches.find(b => b.id === booking.branchId));
        }
        return booking;
      }));
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async goBackToInfo() {
    const nav = document.querySelector('ion-nav');
    nav.pop();
  }

  confirmReservation() {
    this.currentBooking.notes = this.notes;
    this.store$.dispatch(BookingStoreActions.add({ userBooking: this.currentBooking }));
    this.close();
  }
}
