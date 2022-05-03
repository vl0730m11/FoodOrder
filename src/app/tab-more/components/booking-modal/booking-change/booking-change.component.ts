import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingSlot, Booking } from 'src/app/models/booking';
import { RestaurantBranch, User } from 'src/app/models/classes';
import {
  RootStoreState, BookingStoreActions, BookingStoreSelectors,
  RestaurantStoreSelectors
} from 'src/app/root-store';
import { BookingService } from 'src/app/services/booking.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';

@Component({
  selector: 'app-booking-change',
  templateUrl: './booking-change.component.html',
  styleUrls: ['./booking-change.component.scss'],
})
export class BookingChangeComponent implements OnInit {

  slots$: Observable<BookingSlot[]>;
  partySizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  currentTab = true;
  historyTab = false;

  currentBooking$: Observable<Booking>;
  currentTime = new Date().toISOString();
  nextYear = new Date().getFullYear() + 1;

  selectedBranch$: Observable<RestaurantBranch>;
  selectDate$ = new BehaviorSubject<string>(this.currentTime);

  slideOccasionOpts = {
    initialSlide: 0,
    spaceBetween: 1,
    centeredSlides: false,
    slidesPerView: 2.75,
    autoHeight: false
  };

  reservationForm: FormGroup;
  occasions: any[] = [];
  selectedOccasion = '';
  selectedSlot: BookingSlot;

  customer$: Observable<User>;
  user: User;
  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private modalService: ModalService
  ) {
    this.reservationForm = this.initForm();
  }

  ngOnInit() {
    this.store$.dispatch(BookingStoreActions.loadBookingSlots({ branchId: 1 }));

    this.currentBooking$ = combineLatest([
      this.store$.select(RestaurantStoreSelectors.getBranches),
      this.store$.select(BookingStoreSelectors.getTempBooking)
    ]).pipe(
      map(([branches, booking]) => {
        if (!branches.length || !booking) { return; }
        if (booking) {
          this.assignForm(booking);
          this.selectedBranch$ = of(branches.find(b => b.id === booking.branchId));
          this.selectedOccasion = booking.occasion;
          this.store$.dispatch(BookingStoreActions.loadBookingSlots({
            branchId: booking.branchId,
            date: new Date(booking.date).toISOString().substring(0, 10)
          }));
          return booking;
        }
      })
    );

    this.slots$ = this.store$.select(BookingStoreSelectors.getAvailableSlots);
    // this.customer$ = this.store$.select(UserStoreSelectors.getUser).pipe(
    //   tap(user => {
    //     if (user) {
    //       this.user = user;
    //       this.reservationForm.controls.customerId.setValue(user.uid);
    //       this.reservationForm.controls.mobile.setValue(user.mobile);
    //     }
    //   }));

    // this.selectedBranch$ = combineLatest([
    //   this.selectDate$,
    //   this.store$.select(RestaurantStoreSelectors.getSelectedBranch)
    // ]).pipe(map(([date, branch]) => {
    //   // if (branch) {
    //   //   this.reservationForm.controls.branchId.setValue(branch.id);
    //   //   this.reservationForm.controls.restaurantId.setValue(branch.restaurantId);
    //   // }

    //   if (branch && date) {
    //     this.store$.dispatch(BookingStoreActions.loadBookingSlots({ branchId: branch.id, date: date.substring(0, 10) }));
    //   }
    //   return branch;
    // }));

    this.occasions = this.bookingService.getBookingOccasions();
  }

  segmentChanged(tab: number) {
    this.currentTab = tab === 0;
    this.historyTab = tab === 1;
  }

  onBookingDateChange(date: string) {
    this.reservationForm.controls.date.setValue(date);
    this.selectDate$.next(date);
  }

  onSelectTimeSlot(slot: BookingSlot) {
    if (!slot) { return; }
    this.selectedSlot = slot;
    this.reservationForm.controls.time.setValue(slot.time);
    this.reservationForm.controls.slotId.setValue(slot.id);
  }

  onPartySizeChange(guestNo: number) {
    this.reservationForm.controls.guestNo.setValue(guestNo);
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async goToConfirmation() {
    const nav = document.querySelector('ion-nav');
    nav.push(BookingConfirmationComponent);
  }

  async onSelectBranch() {
    return;
    // this.modalService.openBranchSelector().then((res: RestaurantBranch) => {
    //   if (res) {
    //     this.reservationForm.controls.branchId.setValue(res.id);
    //     this.reservationForm.controls.restaurantId.setValue(res.restaurantId);
    //   }
    // });
  }

  async onChangeMobile(mobile: string) {
    this.modalService.openEditor('Mobile', mobile).then((res: string) => {
      if (res) {
        this.reservationForm.controls.mobile.setValue(res);
      }
    });
  }

  onOccasionSelect(occasion: string) {
    this.selectedOccasion = occasion;
    this.reservationForm.controls.occasion.setValue(occasion);
  }

  private initForm() {
    return this.fb.group({
      id: [0],
      branchId: [null, Validators.required],
      slotId: [null, Validators.required],
      restaurantId: [null, Validators.required],
      customerId: ['', Validators.required],
      guestNo: [2, [Validators.required, Validators.min(1)]],
      date: [this.currentTime],
      time: [null],
      notes: [''],
      mobile: ['', [Validators.required]],
      occasion: ['']
    });
  }

  private assignForm(booking: Booking) {
    this.reservationForm.controls.id.setValue(booking.id);
    this.reservationForm.controls.branchId.setValue(booking.branchId);
    this.reservationForm.controls.slotId.setValue(booking.slotId);
    this.reservationForm.controls.restaurantId.setValue(booking.restaurantId);
    this.reservationForm.controls.customerId.setValue(booking.customerId);
    this.reservationForm.controls.guestNo.setValue(booking.guestNo);
    this.reservationForm.controls.date.setValue(booking.date);

    this.reservationForm.controls.time.setValue(booking.time);

    this.reservationForm.controls.notes.setValue(booking.notes);
    this.reservationForm.controls.mobile.setValue(booking.mobile);
    this.reservationForm.controls.occasion.setValue(booking.occasion);
  }

  submit() {
    if (this.reservationForm.invalid) {
      return;
    }

    const userBooking: Booking = Object.assign(new Booking(), this.reservationForm.value);
    userBooking.date = userBooking.date.substring(0, 10);
    userBooking.createdBy = this.user.displayName;
    userBooking.modifiedBy = this.user.displayName;
    this.store$.dispatch(BookingStoreActions.addToCached({ userBooking }));
    this.goToConfirmation();
  }
}
