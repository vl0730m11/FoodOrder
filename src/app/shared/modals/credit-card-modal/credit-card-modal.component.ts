import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardIO } from '@ionic-native/card-io/ngx';
import { ModalController, PickerController } from '@ionic/angular';
import * as moment from 'moment';
import { CreditCard, User } from 'src/app/models/classes';
import { RootStoreState, UserStoreActions, UserStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Status } from 'src/app/root-store/user-store/user-state';
import { combineLatest, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
// import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-credit-card-modal',
  templateUrl: './credit-card-modal.component.html',
  styleUrls: ['./credit-card-modal.component.scss'],
})
export class CreditCardModal implements OnInit, OnDestroy {

  private _user: User = new User();

  @Input() get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
    this.cardForm.controls.cardHolder.setValue(value ? value.displayName : '');
  }

  cardForm: FormGroup;
  submitted: boolean = false;
  minYear: number = new Date().getFullYear();
  title: string = 'Card Details';
  sub: Subscription;
  // cardProviders = [
  //   { id: 'AMEX', label: 'American Express' },
  //   { id: 'MASTER', label: 'Master Card' },
  //   { id: 'VISA', label: 'Visa' }
  // ];

  cardNoLength: number = 16;

  constructor(
    private fb: FormBuilder,
    private cardIO: CardIO,
    private modalController: ModalController,
    private notiService: NotificationService,
    private store$: Store<RootStoreState.AppState>,
    private pickerController: PickerController
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.sub = this.store$.select(UserStoreSelectors.getProcessStatus)
      .subscribe(status => {
        if (status === Status.NONE) { return; }
        if (status === Status.SUCCESS) {
          this.submitted = false;
          this.close();
        } else if (status === Status.ERROR) {
          this.submitted = false;
          // this.notiService.showAlert('Invalid Card Information', error);
        }
      });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  initForm() {
    this.cardForm = this.fb.group({
      // provider: [null, Validators.required],
      cardHolder: [null, Validators.required],
      cardNumber: [null, Validators.required],
      expiryDate: [null, Validators.required],
      cvc: [null, Validators.required]
    });
  }

  saveCard() {
    this.submitted = true;

    const cardForm = this.cardForm.value;
    const expiryDate = moment(cardForm.expiryDate);
    const card = new CreditCard();
    card.stripeId = this.user.stripeId,
      // card.provider = cardForm.provider;
      card.cardHolder = cardForm.cardHolder;
    card.cardNumber = '' + cardForm.cardNumber;
    card.expiryMonth = expiryDate.month() + 1;
    card.expiryYear = expiryDate.year();
    card.cvc = cardForm.cvc;
    card.userId = this.user.id;
    card.uid = this.user.uid;

    this.store$.dispatch(UserStoreActions.addCreditCard({ card }));
  }

  scan() {
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            let options = {
              requireExpiry: true,
              requireCVV: false,
              requirePostalCode: false
            };
            this.cardIO.scan(options);
          }
        }
      );
  }

  next() {

  }

  close() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  // async showCardProvider() {
  //   let options: PickerOptions = {
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Ok',
  //         handler: (value: any) => {
  //           this.onSelectCardProvider(value.provider);
  //         }
  //       }
  //     ],
  //     columns: [{
  //       name: 'provider',
  //       options: this.getColumnOptions()
  //     }]
  //   };

  //   let picker = await this.pickerController.create(options);

  //   picker.present();
  // }

  // getColumnOptions() {
  //   let options = [];
  //   this.cardProviders.forEach(x => {
  //     options.push({ text: x.label, value: x.id });
  //   });
  //   return options;
  // }

  // onSelectCardProvider(provider) {
  //   if (!provider || provider.length === 0) { return; }

  //   this.cardNoLength = provider.value === 'AMEX' ? 15 : 16;

  //   this.cardForm.controls.provider.setValue(provider.value);
  // }
}
