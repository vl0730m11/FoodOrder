import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckoutModal } from '../modals/checkout-modal/checkout-modal.component';
import { CreditCardModal } from '../modals/credit-card-modal/credit-card-modal.component';
import { User, Order, RestaurantBranch } from 'src/app/models/classes';
import { PaymentSelectorModal } from '../modals/payment-selector/payment-selector.component';
// import { LoginComponent } from '../pages/login/login.component';
import { ReceiptModal } from '../modals/receipt-modal/receipt-modal.component';
// import { SignupComponent } from '../pages/signup/signup.component';
// import { SigninComponent } from '../pages/signin/signin.component';
import { EmailVerificationModal } from '../modals/email-verification-modal/email-verification-modal.component';
import { PhoneVerificationModal } from '../modals/phone-verification-modal/phone-verification-modal.component';
import { EditorModal } from '../modals/editor-modal/editor-modal.component';
import { LoginRootModal } from '../modals/login-root-modal/login-root-modal.component';
import { Booking } from 'src/app/models/booking';
import { BookingRescheduleModal } from '../modals/booking-reschedule-modal/booking-reschedule-modal.component';
import { BranchSelectorModal } from '../modals/branch-selector/branch-selector.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalCtrl: ModalController) { }

  async openCreditCardModal(nativeE1: any, user: User) {
    const modal = await this.modalCtrl.create({
      component: CreditCardModal,
      componentProps: {
        user
      },
      swipeToClose: true,
      presentingElement: nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  async openCheckout(nativeE1: any) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModal,
      // componentProps: {
      //   nativeE1
      // },
      swipeToClose: true,
      showBackdrop: true,
      backdropDismiss: true,
      presentingElement: nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  async openPaymentSelector(nativeE1: any) {
    const modal = await this.modalCtrl.create({
      component: PaymentSelectorModal,
      cssClass: 'half-size-modal-css',
      componentProps: {

      },
      swipeToClose: true,
      presentingElement: nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  async openLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginRootModal,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  // async openSignup() {
  //   const modal = await this.modalController.create({
  //     component: SignupComponent,
  //     componentProps: {
  //     },
  //     swipeToClose: false
  //   });

  //   return await modal.present();
  // }

  // async openSignin() {
  //   const modal = await this.modalController.create({
  //     component: SigninComponent,
  //     componentProps: {
  //     },
  //     swipeToClose: false
  //   });

  //   return await modal.present();
  // }


  async showReceipt(order: Order) {
    const modal = await this.modalCtrl.create({
      component: ReceiptModal,
      componentProps: {
        order
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  async openEmailVerification(email: string) {
    const modal = await this.modalCtrl.create({
      component: EmailVerificationModal,
      componentProps: {
        email
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  async openEditor(label: string, value: string) {
    const modal = await this.modalCtrl.create({
      component: EditorModal,
      componentProps: {
        label,
        value
      },
      swipeToClose: false
    });


    await modal.present();

    return (await modal.onDidDismiss()).data
  }

  async openMobileVerification() {
    const modal = await this.modalCtrl.create({
      component: PhoneVerificationModal,
      componentProps: {
      },
      swipeToClose: false
    });

    return await modal.present();
  }

  async openBookingReschedule(userBooking: Booking) {
    const modal = await this.modalCtrl.create({
      component: BookingRescheduleModal,
      componentProps: {
        userBooking
      },
      swipeToClose: false
    });


    return await modal.present();
  }

  async openBranchSelector(): Promise<RestaurantBranch> {
    const modal = await this.modalCtrl.create({
      component: BranchSelectorModal,
      componentProps: {
      },
      swipeToClose: false,
    });

    await modal.present();

    return (await modal.onDidDismiss()).data;
  }
}
