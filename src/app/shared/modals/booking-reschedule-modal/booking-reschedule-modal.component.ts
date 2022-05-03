import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Booking, BookingSlot } from 'src/app/models/booking';
import { RestaurantBranch, User, BookingConditions } from 'src/app/models/classes';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState, RestaurantStoreSelectors } from 'src/app/root-store';
import { BookingStoreSelectors, BookingStoreActions } from 'src/app/root-store/booking-store/booking-index';

@Component({
  selector: 'app-booking-reschedule-modal',
  templateUrl: './booking-reschedule-modal.component.html',
  styleUrls: ['./booking-reschedule-modal.component.scss'],
})
export class BookingRescheduleModal implements OnInit {
  @Input() userBooking: Booking = new Booking();
  private _user: User;
  branches$: Observable<RestaurantBranch[]>;
  selectedBranch$: Observable<RestaurantBranch>;
  selectedBranch: RestaurantBranch;
  bookingSlots$: Observable<BookingSlot[]>;

  partySizeOptions: string[] = [];
  partySize: string = '';
  currentTime = new Date().toISOString();
  bookingTime = new Date().toISOString();
  bookingDate = new Date().toISOString();
  isAvailable: boolean = false;
  availableTime: string[] = [];
  note: string = '';

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    //generate party size
    for (let i = 1; i <= BookingConditions.MAX_CAPACITY; i++) {
      this.partySizeOptions[i] = i.toString();
    }
  }

  ngOnInit() {
    this.branches$ = this.store$.select(RestaurantStoreSelectors.getBranches);
    this.store$.select(RestaurantStoreSelectors.getSelectedBranch)
      .subscribe(selectedBranch => this.selectedBranch = selectedBranch);
    this.store$.dispatch(BookingStoreActions.loadBookingSlots({ branchId: 1 }));
    this.store$.dispatch(BookingStoreActions.loadUserBookings());
    this.bookingSlots$ = this.store$.select(BookingStoreSelectors.getBookingSlots);
    console.log("booking slots: " + this.bookingSlots$);
    this.bookingTime = '' + this.userBooking.time.hours;
    this.bookingDate = this.userBooking.date;
    this.partySize = this.userBooking.guestNo.toString();
    this.note = this.userBooking.notes;
  }


  onPartySizeChange(option: any) {
    this.partySize = option;
  }

  onScheduleTimeChange(option: any) {
    console.log(this.tryCombineDateTime());
    this.checkBookingAvailable(new Date(this.tryCombineDateTime()));
  }

  tryCombineDateTime() {
    //Date ISOstring format: YYYY-MM-DDTHH:mm:ss.sssZ
    if (this.bookingDate && this.bookingTime) {
      var datePart = this.bookingDate.toString().substr(0, 10);
      var timePart = this.bookingTime.toString().substr(11, 16);
      //$scope.fullDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
      return datePart + "T" + timePart;
    }
    return;
  }

  checkBookingAvailable(timeInput: Date) {
    this.availableTime = [];
    this.isAvailable = false;
    // this.testAvailableTime.forEach(x => {
    //   //convert ISOstring to Date        
    //   let timeValue = new Date(x); 
    this.bookingSlots$.subscribe(res => res.forEach(bookingSlot => {
      //convert ISOstring to Date        
      let timeValue = new Date(bookingSlot.date);
      if ((timeInput.getFullYear() === timeValue.getFullYear())
        && (timeInput.getMonth() === timeValue.getMonth())
        && (timeInput.getDate() === timeValue.getDate())) {
        //init time range +-2 from bookingTime
        var startTime = new Date();
        var endTime = new Date();
        startTime.setHours(timeInput.getHours() - 2);
        endTime.setHours(timeInput.getHours() + 2);
        if ((startTime.getHours() <= timeValue.getHours()) && (timeValue.getHours() <= endTime.getHours())) {
          //formatting value into hh:mm
          (timeValue.getMinutes() === 0 ?
            this.availableTime.push(timeValue.getHours() + ":" + timeValue.getMinutes() + "0")
            : this.availableTime.push(timeValue.getHours() + ":" + timeValue.getMinutes()))
          this.isAvailable = true;
        }
      }
    }));

  }

  async getBookingTime(value: string) {
    //console.log("Customer pick: " + value);
    const alert = await this.alertController.create({
      header: 'Reschedule Confirm',
      message: 'Are you sure to reschedule at ' + value + ' ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('customer canceled');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            let userBooking = new Booking();
            userBooking = this.userBooking;
            userBooking.guestNo = Number(this.partySize);
            userBooking.confirmed = false;
            //userBooking.restaurantId = this.selectedBranch.id;
            userBooking.restaurantId = 1;
            userBooking.modifiedOn = new Date(this.currentTime);
            // userBooking.time = new Date(this.bookingDate);
            // userBooking.bookingTime.setHours(Number(value.substr(0, 2)));
            // userBooking.bookingTime.setMinutes(Number(value.substr(3, 4)));
            this.store$.dispatch(BookingStoreActions.update({ booking: userBooking }));
            this.modalCtrl.dismiss({
              dismissed: true
            });
          }
        }
      ]
    });
    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}