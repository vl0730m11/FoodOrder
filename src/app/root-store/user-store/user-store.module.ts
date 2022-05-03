import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userReducer } from './user-reducers';
import { StoreModule } from '@ngrx/store';
import { UserStoreEffects } from './user-effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('userStore', userReducer),
    EffectsModule.forFeature([UserStoreEffects])
  ]
})
export class UserStoreModule { }
