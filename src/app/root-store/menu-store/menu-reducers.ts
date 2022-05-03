import { MenuState } from './menu-state';
import { Action, on, createReducer } from '@ngrx/store';
import * as MenuActions from './menu-actions';

export const initialState: MenuState = {
    categories: [],
    items: [],
    popularItems: [],
    seasonalItems: [],
    ingredients: [],
    isLoading: false,
    isProcessing: false,
    error: null
};

const _menuReducer = createReducer(
    initialState,
    on(MenuActions.loadCategories, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories,
        isLoading: false
    })),

    on(MenuActions.loadCategoriesFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.reorderCats, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.reorderCatsSuccess, (state, { categories }) => ({
        ...state,
        categories,
        isLoading: false
    })),

    on(MenuActions.reorderCatsFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.loadItems, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadItemsSuccess, (state, { items }) => ({
        ...state,
        items,
        isLoading: false
    })),

    on(MenuActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.loadItemsByCategory, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadItemsByCategorySuccess, (state, { items }) => ({
        ...state,
        items,
        isLoading: false
    })),

    on(MenuActions.loadItemsByCategoryFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.loadPopularItems, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadPopularItemsSuccess, (state, { items }) => ({
        ...state,
        popularItems: items,
        isLoading: false
    })),

    on(MenuActions.loadPopularItemsFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.loadSeasonalItems, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadSeasonalItemsSuccess, (state, { items }) => ({
        ...state,
        seasonalItems: items,
        isLoading: false
    })),

    on(MenuActions.loadSeasonalItemsFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(MenuActions.loadIngredients, state => ({
        ...state,
        isLoading: true
    })),

    on(MenuActions.loadIngredientsSuccess, (state, { ingredients }) => ({
        ...state,
        ingredients,
        isLoading: false
    })),

    on(MenuActions.loadIngredientsFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(MenuActions.saveItem, state => ({
        ...state,
        isProcessing: true
    })),

    on(MenuActions.saveItemSuccess, (state, { item }) => ({
        ...state,
        items: state.items.map(i => [item].find(x => x.id === i.id) || i),
        isProcessing: false
    })),

    on(MenuActions.saveItemFailure, (state, { error }) => ({
        ...state,
        error,
        isProcessing: false
    })),

    on(MenuActions.updatePriceBatch, state => ({
        ...state,
        isProcessing: true
    })),

    on(MenuActions.updatePriceBatchSuccess, (state, { items }) => ({
        ...state,
        items,
        isProcessing: false
    })),

    on(MenuActions.updatePriceBatchFailure, (state, { error }) => ({
        ...state,
        error,
        isProcessing: false
    })),
);


export function menuReducer(state: MenuState | undefined, action: Action) {
    return _menuReducer(state, action);
}
