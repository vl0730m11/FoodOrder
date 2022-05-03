import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabMorePage } from './tab-more.page';
// import { CreditCardDetailsPage } from './pages/credit-card-details/credit-card-details.page';
import { UserPage } from './pages/user/user.page';
import { SignupPage } from './pages/signup/signup.page';
import { SigninPage } from './pages/signin/signin.page';
import { AboutPage } from './pages/about/about.page';
import { MyBookingsPage } from './pages/my-bookings/my-bookings.page';
import { BookingDetailsPage } from './pages/booking-details/booking-details.page';

const routes: Routes = [
  {
    path: '',
    component: TabMorePage
  },
  {
    path: 'user',
    component: UserPage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'user/signup',
    component: SignupPage
  },
  {
    path: 'user/signin',
    component: SigninPage
  },
  {
    path: 'my-bookings',
    component: MyBookingsPage
  },
  {
    path: 'my-bookings/:bookingId',
    component: BookingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabMorePageRoutingModule { }
