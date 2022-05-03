import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MenuItem, MenuCategory } from 'src/app/models/classes';
import { Store } from '@ngrx/store';
import { RootStoreState, MenuStoreSelectors } from 'src/app/root-store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.page.html',
  styleUrls: ['./menu-category.page.scss'],
})
export class MenuCategoryPage implements OnInit {

  loadedCategory$: Observable<MenuCategory>;
  menuItems$: Observable<MenuItem[]>;
  searchText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store<RootStoreState.AppState>,
  ) { }

  ngOnInit() {
    const categoryId = +this.activatedRoute.snapshot.params.categoryId;

    this.loadedCategory$ = this.store$.select(MenuStoreSelectors.getCategories)
      .pipe(map(cats => cats.find(c => c.id === categoryId)));

    this.menuItems$ = combineLatest([
      this.searchText$,
      this.store$.select(MenuStoreSelectors.getCategoryItems, { categoryId })
    ]).pipe(
      map(([searchText, items]) => {
        if (!searchText) { return items; }
        return items.filter(i => i.title.toLowerCase().includes(searchText.toLowerCase()));
      })
    );
  }

  onSearch(query: string) {
    this.searchText$.next(query);
  }
}
