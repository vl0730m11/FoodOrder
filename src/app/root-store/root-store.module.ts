import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { MenuStoreModule } from './menu-store/menu-store.module';
import { ShoppingCartStoreModule } from './shopping-cart-store/shopping-cart-store.module';
import { UserStoreModule } from './user-store/user-store.module';
import { OrderStoreModule } from './order-store/order-store.module';
import { RestaurantStoreModule } from './restaurant-store/restaurant-store.module';
import { BookingStoreModule } from './booking-store/booking-index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    //import modules for setting up ngRx
    // StoreModule.forRoot({ router: routerReducer }),
    StoreModule.forRoot({},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: "Ionic Food Order",
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot(),

    // import all feature store module below
    MenuStoreModule,
    ShoppingCartStoreModule,
    UserStoreModule,
    OrderStoreModule,
    RestaurantStoreModule,
    BookingStoreModule
  ]
})
export class RootStoreModule { }
