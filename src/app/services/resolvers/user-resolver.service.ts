import { Injectable } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import * as Actions from '../../root-store';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolver {

  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this._store$.dispatch(Actions.UserStoreActions.getUser());
    this.store$.dispatch(Actions.UserStoreActions.loadUser());
  }
}
