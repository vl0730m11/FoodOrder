import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookingStoreEffects } from './booking-effects';
import { bookingReducer } from './booking-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('bookingStore', bookingReducer),
    EffectsModule.forFeature([BookingStoreEffects])
  ]
})
export class BookingStoreModule { }
