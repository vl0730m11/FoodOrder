import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMenuPageRoutingModule } from './tab-menu-routing.module';

import { TabMenuPage } from './tab-menu.page';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TabMenuPageRoutingModule
  ],
  declarations: [TabMenuPage, MenuItemComponent]
})
export class TabMenuPageModule { }
