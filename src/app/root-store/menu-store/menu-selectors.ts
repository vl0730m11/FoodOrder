import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { MenuState } from './menu-state';

export const selectMenuFeature = (state: AppState) => {
    return state.menuStore;
};

export const getCategories = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.categories
);

export const getCategoryById = createSelector(
    selectMenuFeature,
    (state: MenuState, { categoryId }) => state.categories.find(c => c.id === categoryId)
);

export const getMenuItems = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.items
);

export const getItem = createSelector(
    selectMenuFeature,
    (state: MenuState, { itemId }) => state.items.find(i => i.id === itemId)
);

export const getCategoryItems = createSelector(
    selectMenuFeature,
    (state: MenuState, { categoryId }) => state.items ? state.items.filter(i => i.categoryId === categoryId) : []
);

export const getPopularItems = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.popularItems
);

export const getSeasonalItems = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.seasonalItems ? state.seasonalItems.filter(i => i.imageUrl !== '') : []
);

export const getIngredients = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.ingredients
);

export const getLoadingStatus = createSelector(
    selectMenuFeature,
    (state: MenuState) => state.isLoading
)