import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMorePageRoutingModule } from './tab-more-routing.module';

import { TabMorePage } from './tab-more.page';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { UserPage } from './pages/user/user.page';
import { SignupPage } from './pages/signup/signup.page';
import { SigninPage } from './pages/signin/signin.page';
import { SharedModule } from '../shared/shared.module';
import { AboutPage } from './pages/about/about.page';
import { MyBookingsPage } from './pages/my-bookings/my-bookings.page';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { BookingDetailsPage } from './pages/booking-details/booking-details.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BookingConfirmationComponent } from './components/booking-modal/booking-confirmation/booking-confirmation.component';
import { BookingInfoComponent } from './components/booking-modal/booking-info/booking-info.component';
import { BookingChangeComponent } from './components/booking-modal/booking-change/booking-change.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TabMorePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    TabMorePage,
    UserProfileComponent,
    LoginComponent,
    UserPage,
    SignupPage,
    SigninPage,
    AboutPage,
    MyBookingsPage,
    BookingDetailsPage,
    BookingModalComponent,
    BookingInfoComponent,
    BookingConfirmationComponent,
    BookingChangeComponent,
    BookingCardComponent
  ],
  entryComponents: [BookingInfoComponent, BookingConfirmationComponent, BookingModalComponent, BookingChangeComponent],
  providers: [
    CallNumber
  ]
})
export class TabMorePageModule { }
