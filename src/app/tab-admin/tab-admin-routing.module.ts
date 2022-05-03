import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdminPage } from './tab-admin.page';
import { ItemEditorComponent } from './pages/item-editor/item-editor.component';
import { ItemImporterComponent } from './pages/item-importer/item-importer.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';
import { ManageMenuCategoryComponent } from './pages/manage-menu/manage-menu-category/manage-menu-category.component';
import { ManageMenuItemComponent } from './pages/manage-menu/manage-menu-item/manage-menu-item.component';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { ManageInvoiceComponent } from './pages/manage-invoice/manage-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: TabAdminPage
  },
  {
    path: 'manage-order',
    component: ManageOrderComponent
  },
  {
    path: 'edit-item',
    component: ItemEditorComponent,
  },
  {
    path: 'manage-menu',
    component: ManageMenuComponent,
  },
  {
    path: 'manage-menu/:catId',
    component: ManageMenuCategoryComponent// MenuSplitPaneComponent,
  },
  {
    path: 'manage-menu/:catId/:itemId',
    component: ManageMenuItemComponent,
  },
  {
    path: 'manage-booking',
    component: ManageBookingComponent,
  },
  {
    path: 'manage-invoice',
    component: ManageInvoiceComponent,
  },
  {
    path: 'import-item',
    component: ItemImporterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdminPageRoutingModule { }
