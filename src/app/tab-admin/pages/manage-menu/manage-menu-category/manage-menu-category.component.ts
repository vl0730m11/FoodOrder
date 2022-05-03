import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MenuCategory, MenuItem } from 'src/app/models/classes';
import { Store } from '@ngrx/store';
import { RootStoreState, MenuStoreSelectors } from 'src/app/root-store';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-manage-menu-category',
  templateUrl: './manage-menu-category.component.html',
  styleUrls: ['./manage-menu-category.component.scss'],
})
export class ManageMenuCategoryComponent implements OnInit {

  category$: Observable<MenuCategory>;
  menuItems$: Observable<MenuItem[]>;
  searchText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.AppState>,
    private navController: NavController
  ) { }

  ngOnInit() {
    const categoryId = +this.route.snapshot.paramMap.get('catId');
    this.category$ = this.store$.select(MenuStoreSelectors.getCategoryById, { categoryId });

    this.menuItems$ = combineLatest([
      this.searchText$,
      this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId })
    ]).pipe(
      map(([searchText, items]) => {
        if (!searchText) { return items; }
        return items.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()));
      })
    );

  }

  saveChanges() {

  }

  onSearch(text: string) {
    this.searchText$.next(text);
  }

  goToItemInfo(loadedItem: MenuItem) {
    this.navController.navigateForward(['tabs/admin/manage-menu/', loadedItem.categoryId, loadedItem.id]);
  }

  addItem(categoryId: number) {
    this.navController.navigateForward(['tabs/admin/manage-menu/', categoryId, 'new']);
  }

}
