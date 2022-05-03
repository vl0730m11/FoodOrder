import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabOrderPageRoutingModule } from './tab-order-routing.module';

import { TabOrderPage } from './tab-order.page';
import { OrderCardItemsComponent } from './components/order-card-items/order-card-items.component';
import { OrderProgressModal } from './components/order-progress/order-progress.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TabOrderPageRoutingModule
  ],
  declarations: [TabOrderPage, OrderCardItemsComponent, OrderProgressModal],
  entryComponents: [OrderProgressModal]
})
export class TabOrderPageModule { }
