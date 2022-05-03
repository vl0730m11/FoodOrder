import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCategoryPageRoutingModule } from './menu-category-routing.module';

import { MenuCategoryPage } from './menu-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCategoryPageRoutingModule
  ],
  declarations: [MenuCategoryPage]
})
export class MenuCategoryPageModule {}
