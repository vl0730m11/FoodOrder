import { Component, OnInit } from '@angular/core';
import { RootStoreState, UserStoreSelectors, UserStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, CreditCard } from 'src/app/models/classes';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user$: Observable<User>;
  loading$: Observable<boolean>;
  cards$: Observable<CreditCard[]>;

  constructor(
    private store$: Store<RootStoreState.AppState>,
  ) { }

  ngOnInit() {
    this.user$ = this.store$.select(UserStoreSelectors.getUser).pipe(
      tap(user => {
        if (!user) this.store$.dispatch(UserStoreActions.loadUser());
      }));

    this.loading$ = this.store$.select(UserStoreSelectors.getLoadingStatus);
    this.cards$ = this.store$.select(UserStoreSelectors.getCards);
  }

  saveUser(user: User) {
    if (!user) return;
    this.store$.dispatch(UserStoreActions.saveUser({ user }));
  }

  deleteCard(card: CreditCard) {
    this.store$.dispatch(UserStoreActions.removeCreditCard({ card }));
  }

  loginGoogle() {
    this.store$.dispatch(UserStoreActions.loginWithGoogle());
  }

  loginFacebook() {
    this.store$.dispatch(UserStoreActions.loginWithFacebook());
  }

  logout() {
    this.store$.dispatch(UserStoreActions.logout());
  }
}
