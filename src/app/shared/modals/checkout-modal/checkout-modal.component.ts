import { Component, ViewEncapsulation } from '@angular/core';
import { ShoppingCartModal } from './shopping-cart-modal/shopping-cart-modal.component';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutModal {

  root = ShoppingCartModal;

  constructor() { }
}
