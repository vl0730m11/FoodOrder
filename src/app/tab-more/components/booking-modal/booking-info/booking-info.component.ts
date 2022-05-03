import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { BookingSlot, Booking } from 'src/app/models/booking';
import { Store } from '@ngrx/store';
import { RootStoreState, RestaurantStoreSelectors, UserStoreSelectors } from 'src/app/root-store';
import { ModalController } from '@ionic/angular';
import { BookingStoreActions, BookingStoreSelectors } from 'src/app/root-store/booking-store/booking-index';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';
import { RestaurantBranch, User } from 'src/app/models/classes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { tap, map } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.scss'],
})
export class BookingInfoComponent implements OnInit {

  slots$: Observable<BookingSlot[]>;
  partySizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  currentTab = true;
  historyTab = false;

  booking: Booking = new Booking();
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

    this.slots$ = this.store$.select(BookingStoreSelectors.getAvailableSlots);

    this.customer$ = this.store$.select(UserStoreSelectors.getUser).pipe(
      tap(user => {
        if (user) {
          this.user = user;
          this.reservationForm.controls.customerId.setValue(user.uid);
          this.reservationForm.controls.customerName.setValue(user.displayName);
          this.reservationForm.controls.mobile.setValue(user.mobile);
        }
      }));

    this.selectedBranch$ =
      combineLatest([
        this.selectDate$,
        this.store$.select(RestaurantStoreSelectors.getSelectedBranch)
      ]).pipe(map(([date, branch]) => {
        if (branch) {
          this.reservationForm.controls.branchId.setValue(branch.id);
          this.reservationForm.controls.restaurantId.setValue(branch.restaurantId);
        }

        if (branch && date) {
          this.store$.dispatch(BookingStoreActions.loadBookingSlots({ branchId: branch.id, date: date.substring(0, 10) }));
        }
        return branch;
      }));

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
    this.modalService.openBranchSelector().then((res: RestaurantBranch) => {
      if (res) {
        this.reservationForm.controls.branchId.setValue(res.id);
        this.reservationForm.controls.restaurantId.setValue(res.restaurantId);
      }
    });
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
      customerName: ['', Validators.required],
      guestNo: [2, [Validators.required, Validators.min(1)]],
      date: [this.currentTime],
      time: [null],
      notes: [''],
      mobile: ['', [Validators.required]],
      occasion: ['']
    });
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
