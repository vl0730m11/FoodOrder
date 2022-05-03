import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { MenuItem } from 'src/app/models/classes';
import { MenuItemModal } from '../../modals/menu-item-modal/menu-item-modal.component';
import { RootStoreState, UserStoreActions, UserStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'menu-sliding-panel',
  templateUrl: './menu-sliding-panel.component.html',
  styleUrls: ['./menu-sliding-panel.component.scss'],
})
export class MenuSlidingPanelComponent implements OnInit {

  @Input() items: MenuItem[] = [];
  @Input() header: string = '';
  @Input() iconClass: string = '';
  @Input() showFavorite: boolean = false;
  @Input() color: string = 'danger';
  
  slideOpts = {
    initialSlide: 0,
    spaceBetween: -15,
    centeredSlides: false,
    slidesPerView: 2.25,
    autoHeight: false
  };

  showFavorite$: Observable<boolean>;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private store$: Store<RootStoreState.AppState>
  ) {
    this.showFavorite$ = this.store$.select(UserStoreSelectors.isUserLogin)
      .pipe(map(hasLogin => hasLogin && this.showFavorite));
  }

  ngOnInit() { }

  updateFavorite(isFavorite: boolean, menuItemId: number) {
    if (isFavorite) {
      this.store$.dispatch(UserStoreActions.addFavorite({ menuItemId }));
    } else {
      this.store$.dispatch(UserStoreActions.removeFavorite({ menuItemId }));
    }
  }

  async goToDetails(item: MenuItem) {

    const modal = await this.modalController.create({
      component: MenuItemModal,
      componentProps: {
        loadedItem: item
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
