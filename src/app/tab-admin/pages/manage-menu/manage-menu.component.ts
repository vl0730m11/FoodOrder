import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MenuCategory } from 'src/app/models/classes';
import { Store } from '@ngrx/store';
import { RootStoreState, MenuStoreSelectors, MenuStoreActions } from 'src/app/root-store';
import { NavController, IonReorderGroup } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { deepCopy } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
})
export class ManageMenuComponent implements OnInit {

  menuCategories$: Observable<MenuCategory[]>;
  searchText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  tempCategories: MenuCategory[] = [];
  showReorder = true;
  changed = false;

  @ViewChild(IonReorderGroup, { static: false }) reorderGroup: IonReorderGroup;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.menuCategories$ = combineLatest([
      this.searchText$,
      this.store$.select(MenuStoreSelectors.getCategories)]).pipe(
        map(([searchText, categories]) => {
          this.tempCategories = deepCopy(categories);
          if (!searchText) { return this.tempCategories; }
          return this.tempCategories.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()));
        })
      );
  }

  reorderCategory(ev: any, items: MenuCategory[]) {
    this.changed = true;
    items = ev.detail.complete(items);
  }

  saveChanges() {
    let i = 0;
    this.tempCategories = this.tempCategories.map(cat => {
      cat.displayOrder = i;
      i++;
      return cat;
    });

    this.store$.dispatch(MenuStoreActions.reorderCats({ categories: this.tempCategories }));
  }

  goToCategoryInfo(categoryId: number) {
    this.navController.navigateForward(['tabs/admin/manage-menu', categoryId]);
  }

  onSearch(text: string) {
    this.searchText$.next(text);
  }

  // toggleReorderGroup() {
  //   this.reorderGroup.disabled = !this.reorderGroup.disabled;
  // }
}
