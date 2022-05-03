import { MenuState } from './menu-store/menu-state';
import { ShoppingCartState } from './shopping-cart-store/shopping-cart-state';
import { UserState } from './user-store/user-state';
import { OrderState } from './order-store/order-state';
import { RestaurantState } from './restaurant-store/restaurant-state';
import { BookingState } from './booking-store/booking-state';

export interface AppState {
    menuStore: MenuState
    restaurantStore: RestaurantState
    orderStore: OrderState
    shoppingCartStore: ShoppingCartState
    userStore: UserState
    bookingStore: BookingState
}

export const initialState: AppState = {
    menuStore: null,
    restaurantStore: null,
    orderStore: null,
    shoppingCartStore: null,
    userStore: null,
    bookingStore: null,
}