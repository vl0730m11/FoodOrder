import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderStoreEffects } from './order-effects';
import { orderReducer } from './order-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('orderStore', orderReducer),
    EffectsModule.forFeature([OrderStoreEffects])
  ]
})
export class OrderStoreModule { }
