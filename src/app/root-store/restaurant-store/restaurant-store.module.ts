import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { restaurantReducer } from './restaurant-reducers';
import { RestaurantStoreEffects } from './restaurant-effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('restaurantStore', restaurantReducer),
    EffectsModule.forFeature([RestaurantStoreEffects])
  ]
})
export class RestaurantStoreModule { }
