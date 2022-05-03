import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemIngredient, MenuItem, CartItem } from 'src/app/models/classes';
import { CartService } from 'src/app/services/cart.service';
import { deepCopy } from 'src/app/utils/utils-functions';
import { ToastController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootStoreState, MenuStoreSelectors, CartStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  loadedItem$: Observable<MenuItem>;
  totalPrice: number = 0;

  // @Input() loadedItem: MenuItem = new MenuItem();

  private cartItem: CartItem = new CartItem();

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('categoryId')) {
        return;
      }
      const itemId = +paramMap.get('itemId');
      this.loadedItem$ = this.store$.select(MenuStoreSelectors.getItem, { itemId })
        .pipe(tap(item => {
          this.cartItem.item = item;
          this.cartItem.item.selectedOption = item.options.length > 0 ? item.options[0] : '';
          this.cartItem.amount = 1;
          this.totalPrice = item.price;
        }));
    });
  }

  addToCart() {
    if (!this.cartItem) return;

    this.store$.dispatch(CartStoreActions.addItem({ item: this.cartItem }));
    this.notificationService.show('Item has been added to cart');
    this.router.navigate(['tabs/menu']);
  }

  onValueChange(cartItem: CartItem) {
    this.cartItem = cartItem;
    this.totalPrice = cartItem.itemPrice;
  }
}

