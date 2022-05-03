import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { CartService } from '../services/cart.service';
import { MenuCategory } from '../models/classes';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { RootStoreState, CartStoreSelectors } from '../root-store';
import { Store } from '@ngrx/store';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.page.html',
  styleUrls: ['./tab-menu.page.scss'],
})
export class TabMenuPage implements OnInit {

  categories$: Observable<MenuCategory[]>;
  showCart: boolean = false;
  cartPrice: number = 0;

  // cartPrice$: Observable<number>;
  constructor(
    private store$: Store<RootStoreState.AppState>,
    private menuService: MenuService,
    public cartService: CartService,
    private modalService: ModalService,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.store$.select(CartStoreSelectors.getCartTotalPrice).subscribe(x => {
      this.cartPrice = x;
    });

    this.categories$ = this.menuService.getAllCategories();
  }

  goToCheckout() {
    return this.modalService.openCheckout(this.routerOutlet.nativeEl);
  }
}
