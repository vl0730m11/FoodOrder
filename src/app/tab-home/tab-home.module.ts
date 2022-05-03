import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabHomePageRoutingModule } from './tab-home-routing.module';

import { TabHomePage } from './tab-home.page';
import { SharedModule } from '../shared/shared.module';
import { MenuItemModal } from './modals/menu-item-modal/menu-item-modal.component';
import { MenuSlidingPanelComponent } from './components/menu-sliding-panel/menu-sliding-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TabHomePageRoutingModule
  ],
  declarations: [TabHomePage, MenuItemModal, MenuSlidingPanelComponent],
  entryComponents: [MenuItemModal]
})
export class TabHomePageModule { }
