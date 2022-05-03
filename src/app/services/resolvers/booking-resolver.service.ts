import { Injectable } from '@angular/core';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as Actions from '../../root-store';

@Injectable({
  providedIn: 'root'
})
export class BookingResolver {
  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store$.dispatch(Actions.BookingStoreActions.loadBookingSlots({ branchId: 1 }));
  }
}
