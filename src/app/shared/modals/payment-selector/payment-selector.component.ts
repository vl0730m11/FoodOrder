import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User, CreditCard } from 'src/app/models/classes';
import { RootStoreState, UserStoreActions, UserStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardModal } from '../credit-card-modal/credit-card-modal.component';

@Component({
  selector: 'app-payment-selector',
  templateUrl: './payment-selector.component.html',
  styleUrls: ['./payment-selector.component.scss'],
})
export class PaymentSelectorModal {

  @Input() selectedCard: CreditCard;
  @Input() nativeE1: any;

  cards$: Observable<CreditCard[]>;
  user: User;

  constructor(
    private store$: Store<RootStoreState.AppState>,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.cards$ = combineLatest([
      this.store$.select(UserStoreSelectors.getCards),
      this.store$.select(UserStoreSelectors.getUser)
    ]).pipe(
      map(([cards, user]) => {
        this.user = user;
        return cards.map(c => {
          c.isSelected = this.selectedCard.id === c.id ? true : false;
          return c;
        });
      })
    );
  }

  async onAddPaymentMethod() {
    const modal = await this.modalController.create({
      component: CreditCardModal,
      componentProps: {
        user: this.user
      },
      swipeToClose: true,
      presentingElement: this.nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  onSelectCard(card: CreditCard) {
    if (!card) { return; }

    if (card.isExpired) { return; }

    this.store$.dispatch(UserStoreActions.selectCard({ card }));
    this.close();
  }

  close() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
