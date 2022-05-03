import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';
import * as MenuActions from './menu-actions';
import { MenuCategory, MenuItem, ItemIngredient } from 'src/app/models/classes';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class MenuStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<RootStoreState.AppState>,
        private menuService: MenuService,
        private notificationService: NotificationService
        // private notificationService: NotificationService,
        // private userService: UserService
    ) { }


    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadCategories),
            mergeMap(action => {
                return this.menuService.getAllCategories()
                    .pipe(
                        map((categories: MenuCategory[]) => MenuActions.loadCategoriesSuccess({ categories })),
                        catchError(error => of(MenuActions.loadCategoriesFailure({ error })))
                    );
            })
        )
    );

    loadMenuItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadItems),
            mergeMap(action => {
                return this.menuService.getAllMenuItems()
                    .pipe(
                        map((items: MenuItem[]) => MenuActions.loadItemsSuccess({ items })),
                        catchError(error => of(MenuActions.loadItemsFailure({ error })))
                    );
            })
        )
    );

    loadItemsByCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadItemsByCategory),
            mergeMap(action => {
                return this.menuService.getCategoryMenuItems(action.categoryId)
                    .pipe(
                        map((items: MenuItem[]) => MenuActions.loadItemsByCategorySuccess({ items })),
                        catchError(error => of(MenuActions.loadItemsByCategoryFailure({ error })))
                    );
            })
        )
    );

    loadPopularItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadPopularItems),
            mergeMap(action => {
                return this.menuService.getPopularItems()
                    .pipe(
                        map((items: MenuItem[]) => MenuActions.loadPopularItemsSuccess({ items })),
                        catchError(error => of(MenuActions.loadPopularItemsFailure({ error })))
                    );
            })
        )
    );

    loadSeasonalItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadPopularItems),
            mergeMap(action => {
                return this.menuService.getSeasonalItems()
                    .pipe(
                        map((items: MenuItem[]) => MenuActions.loadSeasonalItemsSuccess({ items })),
                        catchError(error => of(MenuActions.loadSeasonalItemsFailure({ error })))
                    );
            })
        )
    );

    loadIngredients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadIngredients),
            mergeMap(action => {
                return this.menuService.getIngredients()
                    .pipe(
                        map((ingredients: ItemIngredient[]) => MenuActions.loadIngredientsSuccess({ ingredients })),
                        catchError(error => of(MenuActions.loadIngredientsFailure({ error })))
                    );
            })
        )
    );

    saveItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.saveItem),
            mergeMap(action => {
                return this.menuService.saveItem(action.item)
                    .pipe(
                        map((item: MenuItem) => {
                            this.notificationService.show('Item saved !');
                            return MenuActions.saveItemSuccess({ item });
                        }),
                        catchError(error => of(MenuActions.saveItemFailure({ error })))
                    );
            })
        )
    );

    updatePriceBatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.updatePriceBatch),
            mergeMap(action => {
                return this.menuService.updatePriceBatch(action.percentage)
                    .pipe(
                        map((items: MenuItem[]) => {
                            this.notificationService.show('Prices updated !');
                            return MenuActions.updatePriceBatchSuccess({ items });
                        }),
                        catchError(error => of(MenuActions.updatePriceBatchFailure({ error })))
                    );
            })
        )
    );


    reorderCats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.reorderCats),
            mergeMap(action => {
                return this.menuService.reorderCategories(action.categories)
                    .pipe(
                        map((categories: MenuCategory[]) => {
                            this.notificationService.show('Categories updated !');
                            return MenuActions.reorderCatsSuccess({ categories });
                        }),
                        catchError(error => of(MenuActions.reorderCatsFailure({ error })))
                    );
            })
        )
    );
    // importMenu$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(MenuActions.importItem),
    //         mergeMap(action => {
    //             return this.menuService.updateItem(action.item)
    //                 .pipe(
    //                     map((item: MenuItem) => {
    //                         this.notificationService.show('Item updated !');
    //                         return MenuActions.updateItemSuccess({ item })
    //                     }),
    //                     catchError(error => of(MenuActions.updateItemFailure({ error })))
    //                 );
    //         })
    //     )
    // );
}