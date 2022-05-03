// import all root store items
import { RootStoreModule } from './root-store.module';
// import * as RootStoreSelectors from './selectors';
import * as RootStoreState from './state';
// import * as RootStoreEffects from './effects';

// export all feature store below:
export * from './menu-store/menu-index';
export * from './shopping-cart-store/shopping-cart-index';
export * from './order-store/order-index';
export * from './user-store/user-index';
export * from './restaurant-store/restaurant-index';
export * from './booking-store/booking-index';

// export * from './applicant-store/applicant-index';
// export * from './user-store/user-index';
// export * from './school-store/school-index';
// export * from './comms-store/comms-index';

// export all root store items
export { RootStoreState, RootStoreModule }