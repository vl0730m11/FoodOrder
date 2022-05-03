import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuStoreEffects } from './menu-effects';
import { menuReducer } from './menu-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('menuStore', menuReducer),
    EffectsModule.forFeature([MenuStoreEffects])
  ]
})
export class MenuStoreModule { }
