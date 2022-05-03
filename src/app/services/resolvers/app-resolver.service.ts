import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as Actions from '../../root-store';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';

@Injectable({
  providedIn: 'root'
})
export class AppResolver {

  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store$.dispatch(Actions.UserStoreActions.loadUser());
    this.store$.dispatch(Actions.MenuStoreActions.loadCategories());
    this.store$.dispatch(Actions.MenuStoreActions.loadItems());
    this.store$.dispatch(Actions.MenuStoreActions.loadIngredients());
    this.store$.dispatch(Actions.RestaurantStoreActions.loadRestaurant());
  }
}
