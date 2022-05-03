import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from '..';
import { Restaurant } from 'src/app/models/classes';
import * as RestaurantActions from './restaurant-actions';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Injectable()
export class RestaurantStoreEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<RootStoreState.AppState>,
        private restaurantService: RestaurantService
        // private notificationService: NotificationService,
        // private userService: UserService
    ) { }

    loadRestaurant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RestaurantActions.loadRestaurant),
            mergeMap(action => {
                return this.restaurantService.getRestaurant()
                    .pipe(
                        map((restaurant: Restaurant) => RestaurantActions.loadRestaurantSuccess({ restaurant })),
                        catchError(error => of(RestaurantActions.loadRestaurantFailure({ error })))
                    );
            })
        )
    );
}