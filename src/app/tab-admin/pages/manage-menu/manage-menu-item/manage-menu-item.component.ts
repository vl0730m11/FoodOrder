import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, ItemIngredient } from 'src/app/models/classes';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RootStoreState, MenuStoreSelectors, MenuStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { deepCopy } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-manage-menu-item',
  templateUrl: './manage-menu-item.component.html',
  styleUrls: ['./manage-menu-item.component.scss'],
})
export class ManageMenuItemComponent implements OnInit, OnDestroy {

  loadedIngredients: ItemIngredient[] = [];
  loadedItem: MenuItem = new MenuItem();
  sub: Subscription;
  isUnvailable = false;
  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.AppState>,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const itemId = +this.route.snapshot.paramMap.get('itemId');

    if (itemId) {
      this.sub = combineLatest([
        this.store$.select(MenuStoreSelectors.getItem, { itemId }),
        this.store$.select(MenuStoreSelectors.getIngredients)
      ]).subscribe(([item, ingredients]) => {
        if (!item) { return; }
        this.loadedItem = deepCopy(item);
        this.isUnvailable = this.loadedItem.unavailable === 1;

        this.loadedIngredients = deepCopy(ingredients).map((i: ItemIngredient) => {
          i.isChecked = this.loadedItem.ingredients.includes(i.id);
          return i;
        });
      });
    } else {
      this.sub = this.store$.select(MenuStoreSelectors.getIngredients)
        .subscribe(ingredients => {
          this.loadedItem = new MenuItem();
          this.loadedIngredients = deepCopy(ingredients);
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  saveChanges() {
    this.loadedItem.ingredients = this.loadedIngredients
      .filter(x => x.isChecked)
      .map(x => x.id);

    if (this.loadedItem.id > 0) {
      this.store$.dispatch(MenuStoreActions.saveItem({ item: this.loadedItem }));
    }
  }

  removeOption(option: string) {
    this.loadedItem.options = this.loadedItem.options.filter(o => o !== option);
  }

  onAvailableChange(e) {
    this.loadedItem.unavailable = this.isUnvailable ? 1 : 0;
  }

  async addOption() {
    const alert = await this.alertController.create({
      header: 'New Option',
      inputs: [
        {
          name: 'option',
          type: 'text',
          placeholder: 'Option name',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        }, {
          text: 'Save',
          handler: (data) => {
            if (data) { this.loadedItem.options.push(data.option); }
          }
        }
      ]
    });
    await alert.present();
  }

  async editOption(option: string) {
    const alert = await this.alertController.create({
      header: 'Edit Option',
      inputs: [
        {
          name: 'option', type: 'text',
          placeholder: 'Option name', value: option
        },
      ],
      buttons: [
        { text: 'Cancel', handler: () => { } },
        {
          text: 'Save', handler: (data) => {
            if (data && data.option) {
              const index = this.loadedItem.options.indexOf(option);
              this.loadedItem.options[index] = data.option;
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
