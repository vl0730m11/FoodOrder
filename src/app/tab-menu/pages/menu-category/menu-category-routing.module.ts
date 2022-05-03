import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCategoryPage } from './menu-category.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCategoryPageRoutingModule {}
