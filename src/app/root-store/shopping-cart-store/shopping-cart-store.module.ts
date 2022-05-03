import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartReducer } from './shopping-cart-reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartEffects } from './shopping-cart-effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('shoppingCartStore', cartReducer),
    EffectsModule.forFeature([ShoppingCartEffects])
  ]
})
export class ShoppingCartStoreModule { }
