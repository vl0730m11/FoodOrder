import { Component, OnInit } from '@angular/core';
import { RootStoreState, RestaurantStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { BookingStoreActions, BookingStoreSelectors } from 'src/app/root-store/booking-store/booking-index';
import { Observable, combineLatest } from 'rxjs';
import { BookingSlot, Booking } from 'src/app/models/booking';
import { NavController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { BookingModalComponent } from '../../components/booking-modal/booking-modal.component';
import { RestaurantBranch } from 'src/app/models/classes';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {

  slots$: Observable<BookingSlot[]>;
  branches$: Observable<RestaurantBranch[]>;

  partySizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  currentTab = true;
  historyTab = false;

  booking: Booking = new Booking();
  currentTime = new Date();
  nextYear = new Date().getFullYear() + 1;

  currentBookings$: Observable<Booking[]>;
  pastBookings$: Observable<Booking[]>;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private navCtrl: NavController,
    private routerOutlet: IonRouterOutlet,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.store$.dispatch(BookingStoreActions.loadUserBookings());

    this.currentBookings$ = this.store$.select(BookingStoreSelectors.getUserActiveBookings);
    this.pastBookings$ = this.store$.select(BookingStoreSelectors.getUserPastBookings);
  }

  goToBookingDetails(booking: Booking) {
    if (!booking) { return; }
    this.navCtrl.navigateForward(['tabs/more/my-bookings/' + booking.id]);
  }

  async createBooking() {
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { isReschedule: false },
      swipeToClose: true,
      showBackdrop: true,
      backdropDismiss: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}