import { Component, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { BookingSlot, Booking } from 'src/app/models/booking';
import { Store } from '@ngrx/store';
import { RootStoreState, RestaurantStoreSelectors } from 'src/app/root-store';
import { ModalController } from '@ionic/angular';
import { BookingStoreActions, BookingStoreSelectors } from 'src/app/root-store/booking-store/booking-index';
import { RestaurantBranch, User } from 'src/app/models/classes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-booking-modal',
  templateUrl: './admin-booking-modal.component.html',
  styleUrls: ['./admin-booking-modal.component.scss'],
})
export class AdminBookingModalComponent implements OnInit {
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

  private _currentBooking: Booking;
  @Input() set currentBooking(value: Booking) {
    this._currentBooking = value;
    if (value) {
      this.assignValues(value);
    }
  }
  get currentBooking() {
    return this._currentBooking;
  }

  compareWith = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private modalService: ModalService,
    private userService: UserService
  ) {
    this.reservationForm = this.initForm();
  }

  ngOnInit() {
    this.slots$ = this.store$.select(BookingStoreSelectors.getAvailableSlots);

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

  async onSelectBranch() {
    this.modalService.openBranchSelector().then((res: RestaurantBranch) => {
      if (res) {
        this.reservationForm.controls.branchId.setValue(res.id);
        this.reservationForm.controls.restaurantId.setValue(res.restaurantId);
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
      customerId: [null],
      customerName: ['', Validators.required],
      guestNo: [2, [Validators.required, Validators.min(1)]],
      date: [this.currentTime],
      time: [null],
      notes: [''],
      tableNo: [''],
      mobile: ['', [Validators.required]],
      occasion: ['']
    });
  }

  private assignValues(b: Booking) {
    if (!b) { return; }

    this.reservationForm.controls.id.setValue(b.id);
    this.reservationForm.controls.branchId.setValue(b.branchId);
    this.reservationForm.controls.slotId.setValue(b.slotId);
    this.reservationForm.controls.restaurantId.setValue(b.restaurantId);
    this.reservationForm.controls.customerId.setValue(b.customerId);
    this.reservationForm.controls.customerName.setValue(b.customerName);
    this.reservationForm.controls.guestNo.setValue(b.guestNo);
    this.reservationForm.controls.date.setValue(b.date);
    this.reservationForm.controls.time.setValue(b.time);
    this.reservationForm.controls.notes.setValue(b.notes);
    this.reservationForm.controls.mobile.setValue(b.mobile);
    this.reservationForm.controls.occasion.setValue(b.occasion);
    this.reservationForm.controls.tableNo.setValue(b.tableNo);
    this.selectedOccasion = b.occasion;
    this.selectedSlot = b.slot;
  }

  submit() {
    if (this.reservationForm.invalid) {
      return;
    }

    const adminBooking: Booking = Object.assign(new Booking(), this.reservationForm.value);
    adminBooking.date = adminBooking.date.substring(0, 10);

    const user = this.userService.getUserFromSession();
    adminBooking.createdBy = user.displayName;
    adminBooking.modifiedBy = user.displayName;

    if (!this.currentBooking) {
      this.store$.dispatch(BookingStoreActions.addAdmin({ adminBooking }));
    } else {
      this.store$.dispatch(BookingStoreActions.update({ booking: adminBooking }));
    }
    this.close();
  }
}

