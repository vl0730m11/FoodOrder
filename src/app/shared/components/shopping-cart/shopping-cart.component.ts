import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCart, CartItem } from 'src/app/models/classes';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  @Input() cartItems: CartItem[] = [];
  @Input() readonly: boolean = false;
  @Input() cartPrice: number = 0;
  @Input() deliveryFee: number = 0;

  @Output() clearCartClick = new EventEmitter();
  @Output() addItemClick = new EventEmitter();

  @Output() valueChange = new EventEmitter<CartItem[]>();

  tips: number = 0;
  orderNote: string = '';

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 10,
    centeredSlides: false,
    slidesPerView: 1.5,
    autoHeight: false,
    // slideShadows: true,
    width: 150
  };

  tipOpts = [2.5, 5, 10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  get isValid() {
    return this.cartItems.length > 0;
  }

  constructor() { }

  ngOnInit() { }

  decrement(cartItem: CartItem) {
    if (cartItem.amount === 1) { return; }
    cartItem.amount--;
    this.onChange();
  }

  increment(cartItem: CartItem) {
    cartItem.amount++;
    this.onChange();
  }

  removeCartItem(cartItem: CartItem) {
    // this.cart.cartItems = this.cart.cartItems.filter(i => i.item.id !== cartItem.item.id);
    this.cartItems = this.cartItems.filter(i => i.id !== cartItem.id);
    this.onChange();
  }

  clearCart() {
    this.cartItems = [];
    this.onChange();
    this.clearCartClick.emit();
  }

  onChange() {
    this.valueChange.emit(this.cartItems);
  }

  addItems() {
    this.addItemClick.emit();
  }
}
