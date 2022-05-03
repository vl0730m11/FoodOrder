import { Component, OnInit } from '@angular/core';
import { RootStoreState, MenuStoreSelectors, MenuStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { MenuItem } from 'src/app/models/classes';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { deepCopy } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss'],
})
export class ItemEditorComponent implements OnInit {

  items$: Observable<MenuItem[]>;

  tabSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.store$.dispatch(MenuStoreActions.loadItems());
    this.items$ = combineLatest([
      this.tabSubject$,
      this.store$.select(MenuStoreSelectors.getMenuItems)
    ]).pipe(
      map(res => {
        if (!res[1] || res[1].length === 0) { return []; }

        const tab = res[0];
        if (tab === 0) {
          return res[1];
        } else if (tab === 1) {
          return res[1].filter(x => x.categoryId === 1);
        } else if (tab === 3) {
          return res[1].filter(i => i.categoryId === 8);
        } else if (tab === 4) {
          return res[1].filter(i => i.categoryId === 14);
        } else if (tab === 5) {
          return res[1].filter(i => i.categoryId === 15);
        } else {
          return res[1].filter(i => ![1, 8, 14, 15].includes(i.categoryId))
        }
      }));

    // this.entrees$ = this.store$.select(MenuStoreSelectors.getMenuItems)
    //   .pipe(map(orders => orders.filter(o => o.categoryId === 1)));

    // this.mains$ = this.store$.select(MenuStoreSelectors.getMenuItems)
    //   .pipe(map(orders => orders.filter(o => [2, 3, 4, 5, 6, 7].includes(o.categoryId))));

    // this.soups$ = this.store$.select(MenuStoreSelectors.getMenuItems)
    //   .pipe(map(orders => orders.filter(o => o.categoryId === 8)));
  }

  segmentChanged(tab: number) {
    // this.isAll = tab === 0;
    // this.isEntree = tab === 1;
    // this.isMain = tab === 2;
    // this.isSoup = tab === 3;
    // this.isDrink = tab === 4;
    // this.isOther = tab === 5;

    this.tabSubject$.next(tab);
  }

  async presentActionSheet(item: MenuItem, slidingItem) {
    const buttonAvailability = item.unavailable === 0 ?
      {
        text: 'Mark Unavailable', role: 'destructive', icon: 'close-circle',
        handler: () => { this.confirmSetAvailability(item, slidingItem); }
      } :
      {
        text: 'Mark Available', icon: 'checkmark-circle',
        handler: () => { this.confirmSetAvailability(item, slidingItem); }
      };

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        buttonAvailability,
        {
          text: 'Update Price',
          icon: 'pricetag',
          handler: () => this.confirmUpdateItemPrice(item, slidingItem)
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => slidingItem.close()
        }]
    });
    await actionSheet.present();
  }

  async confirmSetAvailability(item: MenuItem, slidingItem) {
    const headerLabel = item.unavailable === 0 ?
      'Mark "' + item.title + '" unavailable?' :
      'Mark "' + item.title + '" available?';

    const alert = await this.alertController.create({
      header: headerLabel,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Confirm',
          handler: () => {
            const menuItem: MenuItem = deepCopy(item);
            menuItem.unavailable = item.unavailable === 0 ? 1 : 0;
            this.saveItem(menuItem);
            slidingItem.close();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmRemoveItem(item: MenuItem, slidingItem) {
    const alert = await this.alertController.create({
      header: 'Remove "' + item.title + '" from menu?',
      message: 'This item will be removed from the menu and cannot be reverted.',
      buttons: [
        {
          text: 'Cancel', 
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Confirm',
          handler: () => {
            const menuItem: MenuItem = deepCopy(item);
            menuItem.hidden = 1;
            this.saveItem(menuItem);
            slidingItem.close();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmUpdateItemPrice(item: MenuItem, slidingItem) {
    const alert = await this.alertController.create({
      header: 'Update Price',
      inputs: [
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price',
          value: item.price
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Save',
          handler: (data) => {
            const menuItem: MenuItem = deepCopy(item);
            menuItem.price = data.price;
            this.saveItem(menuItem);

            slidingItem.close();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmUpdateBatchPrice(percentage: number) {
    const alert = await this.alertController.create({
      header: 'Update Price ' + percentage + '%',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        }, {
          text: 'Save',
          handler: () => {
            this.updateBatchPrice(percentage);
          }
        }
      ]
    });
    await alert.present();
  }

  private saveItem(item: MenuItem) {
    if (!item) { return; }
    this.store$.dispatch(MenuStoreActions.saveItem({ item }));
  }

  private updateBatchPrice(percentage: number) {
    if (!percentage) { return; }
    this.store$.dispatch(MenuStoreActions.updatePriceBatch({ percentage }));
  }
}
