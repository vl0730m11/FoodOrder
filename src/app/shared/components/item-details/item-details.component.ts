import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem, ItemIngredient, CartItem } from 'src/app/models/classes';
import { deepCopy } from 'src/app/utils/utils-functions';
import { RootStoreState, UserStoreSelectors, UserStoreActions, MenuStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  itemCount: number = 1;
  itemPrice: number = 0;
  extraIngredients: ItemIngredient[] = [];
  removeIngredients: ItemIngredient[] = [];
  isFavorite: boolean = false;

  @Input() item: MenuItem = new MenuItem();
  @Output() valueChange = new EventEmitter<CartItem>();

  ingredients$: Observable<ItemIngredient[]>;
  loadedItem: MenuItem = new MenuItem();
  constructor(
    private store$: Store<RootStoreState.AppState>
  ) { }

  ngOnInit() {
    this.loadedItem = deepCopy(this.item);
    this.itemPrice = this.loadedItem.price;
    this.loadedItem.extras = [];
    this.loadedItem.removes = [];
    this.ingredients$ = this.store$.select(MenuStoreSelectors.getIngredients)
      .pipe(
        map(ingredients => ingredients.filter(i => this.loadedItem.ingredients.includes(i.id))),
        tap(ingredients => {
          this.extraIngredients = deepCopy(ingredients);
          this.removeIngredients = deepCopy(this.extraIngredients);
        })
      );

    this.store$.select(UserStoreSelectors.isFavorite, { itemId: this.item.id })
      .subscribe(isFavorite => this.isFavorite = isFavorite);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.store$.dispatch(UserStoreActions.removeFavorite({ menuItemId: this.item.id }));

    } else {
      this.store$.dispatch(UserStoreActions.addFavorite({ menuItemId: this.item.id }));
    }
  }

  decrement() {
    if (this.itemCount > 1) {
      this.itemCount--;
    }
    this.onChange();
  }

  increment() {
    this.itemCount++;
    this.onChange();
  }

  toggleExtras(selectedIngredient: ItemIngredient) {
    if (!selectedIngredient.isChecked) {
      this.itemPrice = this.itemPrice + selectedIngredient.price;
      this.loadedItem.extras.push(selectedIngredient.name);
      this.loadedItem.extraPrice += selectedIngredient.price;

    } else {
      this.itemPrice = this.itemPrice - selectedIngredient.price;
      this.loadedItem.extraPrice -= selectedIngredient.price;
      this.loadedItem.extras = this.loadedItem.extras.filter(c => c !== selectedIngredient.name);
    }
    this.onChange();
  }

  toggleRemoves(selectedIngredient: ItemIngredient) {
    if (!selectedIngredient.isChecked) {
      this.loadedItem.removes.push(selectedIngredient.name);
    } else {
      this.loadedItem.removes = this.loadedItem.removes.filter(c => c !== selectedIngredient.name);
    }
  }

  onChange() {
    const cartItem = new CartItem();
    cartItem.item = this.loadedItem;
    cartItem.amount = this.itemCount;
    this.valueChange.emit(cartItem);
  }

  onProteinSelect(option: string) {
    this.loadedItem.selectedOption = option;
    this.onChange();
  }
}
