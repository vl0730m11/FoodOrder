import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/classes';
import { WindowService } from 'src/app/services/window.service';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-phone-verification-modal',
  templateUrl: './phone-verification-modal.component.html',
  styleUrls: ['./phone-verification-modal.component.scss'],
})
export class PhoneVerificationModal implements OnInit {

  windowRef: any;
  phoneNumber: string;
  verificationCode: string;
  user: User;

  constructor(
    private win: WindowService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    // this.windowRef.recapchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().languageCode = 'en';

    // this.windowRef.recapchaVerifier.render();

  }

  sendLoginCode() {
    this.getCode();
  }

  getCode() {
    firebase.auth().signInWithPhoneNumber(this.phoneNumber,
      new firebase.auth.RecaptchaVerifier('send-btn', {
        'size': 'invisible',
        'callback': function (res) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.getCode();
        }
      })).then(function (result) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        debugger;
        // this.windowRef.confirmationResult = result;
      }).catch(function (error) {
        debugger;
        // Error; SMS not sent
        // ...
      });
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
      })
      .catch(error => console.log(error, 'Incorrect code entered?'));

  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}