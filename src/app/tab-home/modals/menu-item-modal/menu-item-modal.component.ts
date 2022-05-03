import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDetailsComponent } from 'src/app/shared/components/item-details/item-details.component';
import { MenuItem, CartItem } from 'src/app/models/classes';
import { Store } from '@ngrx/store';
import { RootStoreState, CartStoreActions } from 'src/app/root-store';
import { ToastController, ModalController } from '@ionic/angular';
import { deepCopy } from 'src/app/utils/utils-functions';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.scss'],
})
export class MenuItemModal implements OnInit {

  totalPrice: number = 0;

  @Input() loadedItem: MenuItem = new MenuItem();

  // @ViewChild(ItemDetailsComponent, { static: false }) public itemDetails: ItemDetailsComponent;
  private cartItem: CartItem = new CartItem();

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalCtrl: ModalController,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.cartItem.item = deepCopy(this.loadedItem);
    this.cartItem.item.selectedOption = this.cartItem.item.options.length > 0 ? this.cartItem.item.options[0] : '';
    this.cartItem.amount = 1;
    this.totalPrice = this.cartItem.itemPrice;
  }

  addToCart() {
    if (!this.cartItem) return;

    this.store$.dispatch(CartStoreActions.addItem({ item: this.cartItem }));
    this.notificationService.show('Item has been added to cart');
    this.closeModal();
  }
  // onPriceChange(totalPrice: number) {
  //   this.totalPrice = totalPrice;
  // }

  onValueChange(cartItem: CartItem) {
    this.cartItem = cartItem;
    this.totalPrice = cartItem.itemPrice;
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}