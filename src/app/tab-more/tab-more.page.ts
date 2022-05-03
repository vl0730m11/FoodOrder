import { Component } from '@angular/core';
import { BranchSelectorModal } from '../shared/modals/branch-selector/branch-selector.component';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-more',
  templateUrl: './tab-more.page.html',
  styleUrls: ['./tab-more.page.scss'],
})
export class TabMorePage {

  constructor(
    private modalCtrl: ModalController,
    public auth: AuthService
    ) { }

  async openChangeBranch() {
    const modal = await this.modalCtrl.create({
      component: BranchSelectorModal,
      componentProps: {
      },
      swipeToClose: false,
      // presentingElement: this.nativeE1 // this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
