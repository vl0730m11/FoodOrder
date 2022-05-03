import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/classes';
import { Observable, combineLatest } from 'rxjs';
import { RootStoreState, MenuStoreSelectors, UserStoreSelectors, CartStoreSelectors } from '../root-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ModalService } from '../shared/services/modal.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {

  cartPrice: number = 0;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    public menuService: MenuService,
    private modalService: ModalService,
    private routerOutlet: IonRouterOutlet
  ) { }

  favoriteItems$: Observable<MenuItem[]>;
  soups$: Observable<MenuItem[]>;
  signatures$: Observable<MenuItem[]>;
  entrees$: Observable<MenuItem[]>;

  ngOnInit() {
    this.favoriteItems$ = this.store$.select(UserStoreSelectors.getFavoriteItems);

    this.soups$ = this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId: 8 })
      .pipe(map(items => items.filter(i => i.imageUrl && i.id !== 62)));

    this.signatures$ = combineLatest([
      this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId: 9 }),
      this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId: 10 })
    ]).pipe(
      map(([claypots, traditionals]) => {
        if (claypots.length === 0 || traditionals.length === 0) { return []; }
        return claypots.concat(traditionals).filter(i => i.imageUrl && ![70, 71].includes(i.id));
      }));

    this.entrees$ = this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId: 1 })
      .pipe(map(items => items.filter(i => i.imageUrl && ![1, 3, 21].includes(i.id))));

    this.store$.select(CartStoreSelectors.getCartTotalPrice).subscribe(x => {
      this.cartPrice = x;
    });
  }

  goToCheckout() {
    return this.modalService.openCheckout(this.routerOutlet.nativeEl);
  }
}
