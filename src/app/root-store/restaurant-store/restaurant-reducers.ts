
import { Action, on, createReducer } from '@ngrx/store';
import * as RestaurantActions from '../restaurant-store/restaurant-actions';
import { RestaurantState } from './restaurant-state';

export const initialState: RestaurantState = {
    restaurant: null,
    branches: [],
    selectedBranch: null,
    isLoading: false,
    error: ''
};

const _restaurantReducer = createReducer(
    initialState,

    on(RestaurantActions.loadRestaurant, state => ({
        ...state,
        isLoading: true
    })),
    on(RestaurantActions.loadRestaurantSuccess, (state, { restaurant }) => ({
        ...state,
        restaurant,
        branches: restaurant.branches,
        isLoading: false
    })),

    on(RestaurantActions.loadRestaurantFailure, state => ({
        ...state,
        isLoading: false
    })),

    on(RestaurantActions.selectBranch, (state, { branchId }) => ({
        ...state,
        selectedBranch: state.branches.find(b => b.id === branchId)
    }))
)

export function restaurantReducer(state: RestaurantState | undefined, action: Action) {
    return _restaurantReducer(state, action);
}



