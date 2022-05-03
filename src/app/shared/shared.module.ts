import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponComponent } from './components/coupon/coupon.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutModal } from './modals/checkout-modal/checkout-modal.component';
import { CreditCardModal } from './modals/credit-card-modal/credit-card-modal.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { PaymentSelectorModal } from './modals/payment-selector/payment-selector.component';
import { LocationTimeComponent } from './components/location-time/location-time.component';
import { BranchSelectorModal } from './modals/branch-selector/branch-selector.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReceiptModal } from './modals/receipt-modal/receipt-modal.component';
import { SplashComponent } from './pages/splash/splash.component';
import { EmailVerificationModal } from './modals/email-verification-modal/email-verification-modal.component';
import { PhoneVerificationModal } from './modals/phone-verification-modal/phone-verification-modal.component';
import { EditorModal } from './modals/editor-modal/editor-modal.component';
import { PaymentModal } from './modals/checkout-modal/payment-modal/payment-modal.component';
import { ShoppingCartModal } from './modals/checkout-modal/shopping-cart-modal/shopping-cart-modal.component';
import { LoginRootModal } from './modals/login-root-modal/login-root-modal.component';
import { SigninModal } from './modals/login-root-modal/signin-modal/signin-modal.component';
import { SignupModal } from './modals/login-root-modal/signup-modal/signup-modal.component';
import { LoginModal } from './modals/login-root-modal/login-modal/login-modal.component';
import { BookingRescheduleModal } from './modals/booking-reschedule-modal/booking-reschedule-modal.component';
// import { CheckoutElementComponent } from './components/checkout-element/checkout-element.component';

@NgModule({
  declarations: [
    ItemDetailsComponent,
    CouponComponent,
    PaymentMethodComponent,
    ShoppingCartComponent,
    ItemCardComponent,
    LocationTimeComponent,
    CheckoutModal,
    CreditCardModal,
    PaymentSelectorModal,
    BranchSelectorModal,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    ReceiptModal,
    SplashComponent,
    EmailVerificationModal,
    PhoneVerificationModal,
    EditorModal,
    PaymentModal,
    ShoppingCartModal,
    LoginRootModal,
    SigninModal,
    SignupModal,
    LoginModal,
    BookingRescheduleModal,
    // CheckoutElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    ItemDetailsComponent,
    ShoppingCartComponent,
    ItemCardComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    ReceiptModal,
    SplashComponent,
    EmailVerificationModal,
    PhoneVerificationModal,
    EditorModal,
    PaymentModal,
    ShoppingCartModal,
    LoginRootModal,
    SigninModal,
    SignupModal,
    LoginModal,
    BookingRescheduleModal,
    // CheckoutElementComponent
  ],
  entryComponents: [
    CheckoutModal,
    CreditCardModal,
    PaymentSelectorModal,
    BranchSelectorModal,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    ReceiptModal,
    EmailVerificationModal,
    PhoneVerificationModal,
    EditorModal,
    PaymentModal,
    ShoppingCartModal,
    LoginRootModal,
    SigninModal,
    SignupModal,
    LoginModal,
    BookingRescheduleModal,
  ]
})
export class SharedModule { }
