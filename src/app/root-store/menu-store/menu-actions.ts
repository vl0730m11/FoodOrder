import { createAction, props } from '@ngrx/store';
import { MenuCategory, MenuItem, ItemIngredient } from 'src/app/models/classes';

export enum MenuActionTypes {

    CAT_REQUEST = '[Menu] Load Categories',
    CAT_SUCCESS = '[Menu] Load Categories Success',
    CAT_FAILURE = '[Menu] Load Categories Failure',

    ITEM_REQUEST = '[Menu] Load Items',
    ITEM_SUCCESS = '[Menu] Load Items Success',
    ITEM_FAILURE = '[Menu] Load Items Failure',

    CAT_ITEMS_REQUEST = '[Menu] Load Items By Category',
    CAT_ITEMS_SUCCESS = '[Menu] Load Items By Category Success',
    CAT_ITEMS_FAILURE = '[Menu] Load Items By Category Failure',

    CATS_REORDER = '[Menu] Reorder Category',
    CATS_REORDER_SUCCESS = '[Menu] Reorder Category Success',
    CATS_REORDER_FAILURE = '[Menu] Reorder Category Failure',

    SAVE_ITEM = '[Menu] Save Item',
    SAVE_ITEM_SUCCESS = '[Menu] Save Item Success',
    SAVE_ITEM_FAILURE = '[Menu] Save Item Failure',

    IMPORT_ITEMS = '[Menu] Import Items',
    IMPORT_ITEMS_SUCCESS = '[Menu] Import Items Success',
    IMPORT_ITEMS_FAILURE = '[Menu] Import Items Failure',

    IMPORT_CATS = '[Menu] Import Categories',
    IMPORT_CATS_SUCCESS = '[Menu] Import Categories Success',
    IMPORT_CATS_FAILURE = '[Menu] Import Categories Failure',

    UPDATE_PRICE_BATCH = '[Menu] Update Batch Price',
    UPDATE_PRICE_BATCH_SUCCESS = '[Menu] Batch Price Success',
    UPDATE_PRICE_BATCH_FAILURE = '[Menu] Batch Price Failure',

    POPULAR_ITEMS_REQUEST = '[Menu] Load Popular',
    POPULAR_ITEMS_SUCCESS = '[Menu] Load Popular Success',
    POPULAR_ITEMS_FAILURE = '[Menu] Load Popular Failure',

    SEASONAL_ITEMS_REQUEST = '[Menu] Load Seasonal',
    SEASONAL_ITEMS_SUCCESS = '[Menu] Load Seasonal Success',
    SEASONAL_ITEMS_FAILURE = '[Menu] Load Seasonal Failure',

    INGREDIENTS_REQUEST = '[Menu] Load Ingredients',
    INGREDIENTS_SUCCESS = '[Menu] Load Ingredients Success',
    INGREDIENTS_FAILURE = '[Menu] Load Ingredients Failure',
}

export const saveItem = createAction(
    MenuActionTypes.SAVE_ITEM,
    props<{ item: MenuItem }>()
)

export const saveItemSuccess = createAction(
    MenuActionTypes.SAVE_ITEM_SUCCESS,
    props<{ item: MenuItem }>()
)

export const saveItemFailure = createAction(
    MenuActionTypes.SAVE_ITEM_FAILURE,
    props<{ error: string }>()
)

export const updatePriceBatch = createAction(
    MenuActionTypes.UPDATE_PRICE_BATCH,
    props<{ percentage: number }>()
)

export const updatePriceBatchSuccess = createAction(
    MenuActionTypes.UPDATE_PRICE_BATCH_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const updatePriceBatchFailure = createAction(
    MenuActionTypes.UPDATE_PRICE_BATCH_FAILURE,
    props<{ error: string }>()
)

//#region CATEGORIES
export const loadCategories = createAction(
    MenuActionTypes.CAT_REQUEST
    // props<{ restaurantId: number }>()
)

export const loadCategoriesSuccess = createAction(
    MenuActionTypes.CAT_SUCCESS,
    props<{ categories: MenuCategory[] }>()
)

export const loadCategoriesFailure = createAction(
    MenuActionTypes.CAT_FAILURE,
    props<{ error: string }>()
)

export const reorderCats = createAction(
    MenuActionTypes.CATS_REORDER,
    props<{ categories: MenuCategory[] }>()
)

export const reorderCatsSuccess = createAction(
    MenuActionTypes.CATS_REORDER_SUCCESS,
    props<{ categories: MenuCategory[] }>()
)

export const reorderCatsFailure = createAction(
    MenuActionTypes.CATS_REORDER_FAILURE,
    props<{ error: string }>()
)

export const importCategories = createAction(
    MenuActionTypes.IMPORT_CATS,
    props<{ categories: MenuCategory[] }>()
)

export const importCategoriesSuccess = createAction(
    MenuActionTypes.IMPORT_CATS_SUCCESS,
    props<{ categories: MenuCategory[] }>()
)

export const importCategoriesFailure = createAction(
    MenuActionTypes.IMPORT_CATS_FAILURE,
    props<{ error: string }>()
)
//#endregion

//#region ITEMS
export const loadItems = createAction(
    MenuActionTypes.ITEM_REQUEST,
    // props<{ restaurantId: number }>()
)

export const loadItemsSuccess = createAction(
    MenuActionTypes.ITEM_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const loadItemsFailure = createAction(
    MenuActionTypes.ITEM_FAILURE,
    props<{ error: string }>()
)

export const loadItemsByCategory = createAction(
    MenuActionTypes.CAT_ITEMS_REQUEST,
    props<{ categoryId: number }>()
)

export const loadItemsByCategorySuccess = createAction(
    MenuActionTypes.CAT_ITEMS_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const loadItemsByCategoryFailure = createAction(
    MenuActionTypes.IMPORT_CATS_FAILURE,
    props<{ error: string }>()
)

export const loadPopularItems = createAction(
    MenuActionTypes.POPULAR_ITEMS_REQUEST
    // props<{ restaurantId: number }>()
)

export const loadPopularItemsSuccess = createAction(
    MenuActionTypes.POPULAR_ITEMS_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const loadPopularItemsFailure = createAction(
    MenuActionTypes.POPULAR_ITEMS_FAILURE,
    props<{ error: string }>()
)

export const loadSeasonalItems = createAction(
    MenuActionTypes.SEASONAL_ITEMS_REQUEST
    // props<{ restaurantId: number }>()
)

export const loadSeasonalItemsSuccess = createAction(
    MenuActionTypes.SEASONAL_ITEMS_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const loadSeasonalItemsFailure = createAction(
    MenuActionTypes.SEASONAL_ITEMS_FAILURE,
    props<{ error: string }>()
)

export const loadIngredients = createAction(
    MenuActionTypes.INGREDIENTS_REQUEST
    // props<{ restaurantId: number }>()
)

export const loadIngredientsSuccess = createAction(
    MenuActionTypes.INGREDIENTS_SUCCESS,
    props<{ ingredients: ItemIngredient[] }>()
)

export const loadIngredientsFailure = createAction(
    MenuActionTypes.INGREDIENTS_FAILURE,
    props<{ error: string }>()
)

export const importItems = createAction(
    MenuActionTypes.IMPORT_ITEMS,
    props<{ items: MenuItem[] }>()
)

export const importItemsSuccess = createAction(
    MenuActionTypes.IMPORT_ITEMS_SUCCESS,
    props<{ items: MenuItem[] }>()
)

export const importItemsFailure = createAction(
    MenuActionTypes.IMPORT_ITEMS_FAILURE,
    props<{ error: string }>()
)


