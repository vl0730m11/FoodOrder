import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAdminPageRoutingModule } from './tab-admin-routing.module';

import { TabAdminPage } from './tab-admin.page';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ItemEditorComponent } from './pages/item-editor/item-editor.component';
import { SharedModule } from '../shared/shared.module';
import { ItemImporterComponent } from './pages/item-importer/item-importer.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { AdminOrderItemComponent } from './components/admin-order-item/admin-order-item.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';
import { ManageMenuCategoryComponent } from './pages/manage-menu/manage-menu-category/manage-menu-category.component';
import { ManageMenuItemComponent } from './pages/manage-menu/manage-menu-item/manage-menu-item.component';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { Printer } from '@ionic-native/printer/ngx';
import { AdminBookingModalComponent } from './components/admin-booking-modal/admin-booking-modal.component';
import { ManageInvoiceComponent } from './pages/manage-invoice/manage-invoice.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TabAdminPageRoutingModule,
    UploadModule,
    GridModule,
    HttpClientModule
  ],
  declarations: [
    TabAdminPage,
    ManageOrderComponent,
    ManageMenuComponent,
    ManageMenuCategoryComponent,
    ManageMenuItemComponent,
    ManageBookingComponent,
    ManageInvoiceComponent,
    OrderItemsComponent,
    OrderDetailsComponent,
    ItemEditorComponent,
    ItemImporterComponent,
    AdminOrderItemComponent,
    AdminBookingModalComponent
  ],
  entryComponents: [OrderDetailsComponent, AdminBookingModalComponent],
  providers: [
    FileChooser,
    File,
    SocialSharing,
    FileService,
    Printer,
    CallNumber
  ]
})
export class TabAdminPageModule { }
