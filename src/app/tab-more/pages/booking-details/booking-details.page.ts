import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Booking } from 'src/app/models/booking';
import { ActivatedRoute } from '@angular/router';
import { RootStoreState, RestaurantStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { BookingStoreSelectors, BookingStoreActions } from 'src/app/root-store/booking-store/booking-index';
import { map, tap } from 'rxjs/operators';
import { RestaurantBranch } from 'src/app/models/classes';
import { NotificationService } from 'src/app/services/notification.service';
import { ActionSheetController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BookingModalComponent } from '../../components/booking-modal/booking-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {

  booking$: Observable<Booking>;
  branch$: Observable<RestaurantBranch>;
  selectedOccasion = '';

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

  booking: Booking;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.AppState>,
    private notification: NotificationService,
    private actionsCtrl: ActionSheetController,
    private callNumber: CallNumber,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private location: Location
  ) { }

  ngOnInit() {
    const bookingId = +this.route.snapshot.paramMap.get('bookingId');

    this.booking$ = this.store$.select(BookingStoreSelectors.getBookingById, { bookingId }).pipe(
      tap(booking => this.booking = booking)
    );

    this.branch$ = combineLatest([
      this.booking$,
      this.store$.select(RestaurantStoreSelectors.getBranches)]
    ).pipe(
      map(([booking, branches]) => branches.find(b => b.id === booking.branchId))
    );
  }

  onCancelBooking(booking: Booking) {
    this.notification.confirm('Cancel Reservation', 'Are you sure you want to cancel this reservation?')
      .then(res => {
        if (res.role !== 'cancel') {
          this.store$.dispatch(BookingStoreActions.cancel({ bookingId: booking.id }));
          this.navCtrl.navigateBack(['tabs/more/my-bookings/']);
        }
      });
  }

  async showReservationActions(booking: Booking) {
    const actionSheet = await this.actionsCtrl.create({
      buttons: [
        {
          text: 'Modify reservation',
          // icon: 'checkmark',
          handler: () => this.onModifyBooking(booking)
        },
        {
          text: 'Cancel reservation',
          role: 'destructive',
          // icon: 'close',
          handler: () => this.onCancelBooking(booking)
        }, {
          text: 'Close',
          // icon: 'close',
          role: 'cancel',
          handler: () => { }
        }]
    });
    await actionSheet.present();
  }

  async showPhoneActions(phoneNumber: string) {
    const actionSheet = await this.actionsCtrl.create({
      buttons: [
        {
          text: 'Call ' + phoneNumber,
          icon: 'call',
          handler: () => {
            // location.href = '{{\'tel\':{' + phoneNumber + '}';
            console.log('Calling ' + phoneNumber);
            this.callNumber.callNumber(phoneNumber, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }, {
          text: 'Close',
          // icon: 'close',
          role: 'cancel',
          handler: () => { }
        }]
    });
    await actionSheet.present();
  }

  onModifyBooking(userBooking: Booking) {
    if (!userBooking) { return; }
    this.store$.dispatch(BookingStoreActions.addToCached({ userBooking }));
    this.openBookingModal();
  }

  updateBooking() {
    if (!this.booking) { return; }
    this.store$.dispatch(BookingStoreActions.update({ booking: this.booking }));
  }

  async openBookingModal() {
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { isReschedule: true },
      swipeToClose: true,
      showBackdrop: true,
      backdropDismiss: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
