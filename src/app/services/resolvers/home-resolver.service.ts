import { Injectable } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import * as Actions from '../../root-store';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver {

  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store$.dispatch(Actions.MenuStoreActions.loadPopularItems());
    this.store$.dispatch(Actions.MenuStoreActions.loadSeasonalItems());
  }
}
