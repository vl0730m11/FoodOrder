import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, BookingStoreActions, BookingStoreSelectors, RestaurantStoreSelectors } from 'src/app/root-store';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Booking } from 'src/app/models/booking';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { NotificationService } from 'src/app/services/notification.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AdminBookingModalComponent } from '../../components/admin-booking-modal/admin-booking-modal.component';
import { RestaurantBranch } from 'src/app/models/classes';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss'],
})
export class ManageBookingComponent implements OnInit {

  currentTime = new Date('2020-09-14').toISOString();
  nextYear = new Date().getFullYear() + 1;

  bookings$: Observable<Booking[]>;
  selectedBranch$: Observable<RestaurantBranch>;

  searchDate$ = new BehaviorSubject<string>(this.currentTime);
  searchText$ = new BehaviorSubject<string>('');

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private notification: NotificationService,
    private actionsCtrl: ActionSheetController,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.store$.dispatch(BookingStoreActions.loadAdminBookings());

    this.selectedBranch$ = this.store$.select(RestaurantStoreSelectors.getSelectedBranch);

    const branchOrders$ = combineLatest([
      this.selectedBranch$,
      this.store$.select(BookingStoreSelectors.getAdminBookings)
    ]).pipe(
      map(([branch, bookings]) => {
        if (!branch) { return []; }
        return bookings ? bookings.filter(b => b.branchId === branch.id) : [];
      }));


    this.bookings$ = combineLatest([
      this.searchDate$,
      this.searchText$,
      branchOrders$,
    ]).pipe(
      map(([searchDate, searchText, bookings]) => {
        if (!bookings || !bookings.some) { return []; }
        return bookings.filter(b => moment(b.date.substring(0, 10)).isSame(moment(searchDate.substring(0, 10))));
      })
    );
  }


  onSearch(searchText: string) {
    this.searchText$.next(searchText);
  }

  onDateChanged(selectedDate: string) {
    this.searchDate$.next(selectedDate);
  }

  presentCallActions(phoneNumber: string, slidingItem) {
    this.notification.showPhoneActions(phoneNumber, slidingItem);
  }

  async presentBookingActions(b: Booking) {
    if (b.cancelled) {
      this.presentCancelledBookingActions(b);
    } else {
      this.presentActiveBookingActions(b);
    }
  }

  async onAddNewBooking() {
    console.log('onAddNewBooking');
    this.openAdminBookingModal();
  }

  openChangeBranch() {
    this.modalService.openBranchSelector();
  }
  private async presentCancelledBookingActions(b: Booking) {
    const actionSheet = await this.actionsCtrl.create({
      buttons: [
        {
          text: 'Call ' + b.mobile,
          icon: 'call',
          handler: () => {
            // window.location.href = '{{\'tel\':{' + b.mobile + '}';
            console.log('Calling ' + b.mobile);
            this.callNumber.callNumber(b.mobile, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: 'Reactivate reservation',
          role: 'destructive',
          handler: () => this.onReactivateBooking(b)
        },
        {
          text: 'Close',
          role: 'cancel'
        }]
    });

    await actionSheet.present();
  }

  private async presentActiveBookingActions(b: Booking) {
    const actionSheet = await this.actionsCtrl.create({
      buttons: [
        {
          text: 'Call ' + b.mobile,
          icon: 'call',
          handler: () => {
            // location.href = '{{\'tel\':{' + b.mobile + '}';
            console.log('Calling ' + b.mobile);
            this.callNumber.callNumber(b.mobile, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        },
        {
          text: 'Modify reservation',
          handler: () => this.onModifyBooking(b)
        },
        {
          text: 'Allocate table',
          handler: () => this.onAllocateTable(b)
        },
        {
          text: 'Cancel reservation',
          role: 'destructive',
          handler: () => this.onCancelBooking(b)
        },
        {
          text: 'Close',
          role: 'cancel'
        }]
    });

    await actionSheet.present();
  }

  private onModifyBooking(b: Booking) {
    console.log('onModifyBooking');
    this.openAdminBookingModal(b);
  }

  private async openAdminBookingModal(b?: Booking) {
    const modal = await this.modalCtrl.create({
      component: AdminBookingModalComponent,
      componentProps: {
        currentBooking: b
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();
  }

  private async onAllocateTable(b: Booking) {
    console.log('onAllocateTable');
    const alert = await this.alertCtrl.create({
      header: 'Table',
      inputs: [
        {
          name: 'tableNo',
          type: 'text',
          placeholder: 'Enter table no.',
          value: b.tableNo
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        }, {
          text: 'Save',
          handler: (data) => {
            if (data && data.tableNo) {
              b.tableNo = data.tableNo;
              this.store$.dispatch(BookingStoreActions.update({ booking: b }));
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private onCancelBooking(booking: Booking) {
    console.log('onCancelBooking');
    this.notification.confirm('Cancel Reservation', 'Are you sure you want to cancel this reservation?')
      .then(res => {
        if (res.role !== 'cancel') {
          this.store$.dispatch(BookingStoreActions.cancel({ bookingId: booking.id }));
        }
      });
  }

  private onReactivateBooking(booking: Booking) {
    console.log('onReactivateBooking');
    this.notification.confirm('Reactivate Reservation', 'Are you sure you want to reactivate this reservation?')
      .then(res => {
        if (res.role !== 'cancel') {
          this.store$.dispatch(BookingStoreActions.cancel({ bookingId: booking.id }));
        }
      });
  }
}
