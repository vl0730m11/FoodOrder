import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModal {

  // userUid: string = 'test_user';
  // merchantCode = environment.securePay.merchantCode;
  stripe: any;
  constructor(
    private modalCtrl: ModalController,
  ) { }


  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  // back() {
  //   const nav = document.querySelector('ion-nav');
  //   debugger;
  //   nav.(CheckoutModal);
  // }
}
