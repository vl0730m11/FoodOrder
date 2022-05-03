import { createAction, props } from '@ngrx/store';
import { RestaurantBranch, Restaurant } from 'src/app/models/classes';

export enum RestaurantActionTypes {
    RESTAURANT_REQUEST = '[Restaurant] Load',
    RESTAURANT_SUCCESS = '[Restaurant] Loaded',
    RESTAURANT_FAILURE = '[Restaurant] Load Failure',

    SELECT_BRANCH = '[Restaurant] Select Branch',
}

export const loadRestaurant = createAction(
    RestaurantActionTypes.RESTAURANT_REQUEST,
    // props<{ restaurantId: number }>()
);

export const loadRestaurantSuccess = createAction(
    RestaurantActionTypes.RESTAURANT_SUCCESS,
    props<{ restaurant: Restaurant }>()
);

export const loadRestaurantFailure = createAction(
    RestaurantActionTypes.RESTAURANT_FAILURE,
    props<{ error: string }>()
);

export const selectBranch = createAction(
    RestaurantActionTypes.SELECT_BRANCH,
    props<{ branchId: number }>()
);
