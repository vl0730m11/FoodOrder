import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { RestaurantBranch, OrderType, Timer, DeliveryOption, User } from 'src/app/models/classes';
import { RootStoreState, RestaurantStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'location-time',
  templateUrl: './location-time.component.html',
  styleUrls: ['./location-time.component.scss'],
})
export class LocationTimeComponent implements OnInit {

  private _user: User;

  @Input() set user(value: User) {
    this._user = value;
    this.addressLine1 = value.address;
    this.mobilePhone = value.mobile;
  }
  get user() {
    return this._user;
  }

  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  branches$: Observable<RestaurantBranch[]>;
  selectedBranch$: Observable<RestaurantBranch>;
  selectedBranch: RestaurantBranch;

  diningOption: OrderType = OrderType.PICKUP;
  deliveryOption$: BehaviorSubject<number> = new BehaviorSubject<number>(DeliveryOption.LEAVE_AT_DOOR);

  deliveryTime: string = '0';
  deliveryNote: string = '';
  deliveryInstruction: string = '';
  mobilePhone: string = '';

  addressLine1: string = '';
  addressLine2: string = '';
  addressLine3: string = '';

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 1,
    centeredSlides: false,
    slidesPerView: 2.5,
    autoHeight: false
  };

  @Output() branchSelected = new EventEmitter();
  @Output() orderTypeChange = new BehaviorSubject<OrderType>(OrderType.PICKUP);

  get isValid() {
    if (this.diningOption === OrderType.PICKUP) {
      return (this.selectedBranch && this.deliveryTime);
    } else if (this.diningOption === OrderType.DELIVERY) {
      return (this.selectedBranch && this.deliveryTime && this.addressLine1 && this.mobilePhone);
    }
  }

  timeOptions: Timer[] = [
    // lunch
    new Timer('11:00', '11:30', 'am'),
    new Timer('12:00', '12:30', 'pm'),
    new Timer('12:30', '1:00', 'pm'),
    new Timer('1:00', '1:30', 'pm'),
    new Timer('1:30', '2:00', 'pm'),
    new Timer('2:00', '2:30', 'pm'),

    // diner
    new Timer('5:30', '6:00', 'pm'),
    new Timer('6:00', '6:30', 'pm'),
    new Timer('6:30', '7:00', 'pm'),
    new Timer('7:00', '7:30', 'pm'),
    new Timer('7:30', '8:00', 'pm'),
    new Timer('8:00', '8:30', 'pm'),
    new Timer('8:30', '9:00', 'pm'),
    new Timer('9:00', '9:30', 'pm'),
    new Timer('9:30', '10:00', 'pm'),
    new Timer('10:00', '10:30', 'pm')
  ]

  ngOnInit() {
    this.branches$ = this.store$.select(RestaurantStoreSelectors.getBranches);
    this.store$.select(RestaurantStoreSelectors.getSelectedBranch)
      .subscribe(selectedBranch => this.selectedBranch = selectedBranch);

    this.deliveryOption$.subscribe((option: DeliveryOption) => {
      let opt = '';
      if (option === DeliveryOption.LEAVE_AT_DOOR) {
        opt = 'Leave at door';
      } else if (option === DeliveryOption.MEET_AT_DOOR) {
        opt = 'Meet at door';
      } else if (option === DeliveryOption.MEET_OUTSIDE) {
        opt = 'Meet outside';
      } else if (option === DeliveryOption.OTHER) {
        opt = 'Other';
      }
      this.deliveryNote = opt + '. ' + this.deliveryInstruction;
    });
  }

  getColumnOptions(branches: RestaurantBranch[]) {
    let options = [];
    branches.forEach(x => {
      options.push({ text: x.branchName, value: x.id });
    });
    return options;
  }

  onDiningOptionsChange(option: OrderType) {
    this.diningOption = +option;

    if (option === OrderType.PICKUP) {
      this.deliveryNote = '';
    }

    this.orderTypeChange.next(+option);
  }

  onScheduleTimeChange(option: any) {
    this.deliveryTime = option;
  }

  onDeliveryOptChange(option: any) {
    this.deliveryOption$.next(+option);
  }
}

