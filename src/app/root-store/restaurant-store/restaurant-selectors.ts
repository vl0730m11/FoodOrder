import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { RestaurantState } from './restaurant-state';

export const selectCartFeature = (state: AppState) => {
    return state.restaurantStore
};

export const getLoadingStatus = createSelector(
    selectCartFeature,
    (state: RestaurantState) => state.isLoading
);

export const getRestaurant = createSelector(
    selectCartFeature,
    (state: RestaurantState) => state.restaurant
);

export const getBranches = createSelector(
    selectCartFeature,
    (state: RestaurantState) => state.branches
);

export const getSelectedBranch = createSelector(
    selectCartFeature,
    (state: RestaurantState) => state.selectedBranch
);