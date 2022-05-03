import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/app/models/classes';
import { RootStoreState, UserStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {

  @Input() item: MenuItem = new MenuItem();
  @Input() showFavorite: boolean = false;

  isFavorite: boolean = false;
  isFavorite$: Observable<boolean>;

  sub: Subscription;
  @Output() favoriteChanged = new EventEmitter<boolean>();

  constructor(private store$: Store<RootStoreState.AppState>) { }

  ngOnInit() {
    if (this.showFavorite) {
      this.isFavorite$ = this.store$.select(UserStoreSelectors.isFavorite, { itemId: this.item.id });
    }
  }

  // toggleFavorite() {
  //   this.isFavorite = !this.isFavorite;
  //   this.favoriteChanged.emit(this.isFavorite);
  // }

  like(e) {
    e.stopPropagation();
    this.favoriteChanged.emit(true);
  }

  unlike(e) {
    e.stopPropagation();
    this.favoriteChanged.emit(false);
  }
}
