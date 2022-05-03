import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabOrderPage } from './tab-order.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TabOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class TabOrderPageRoutingModule { }
