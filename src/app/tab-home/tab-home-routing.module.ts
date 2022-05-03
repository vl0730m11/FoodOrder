import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabHomePage } from './tab-home.page';
import { HomeResolver } from '../services/resolvers/home-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TabHomePage,
    resolve: [HomeResolver]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabHomePageRoutingModule { }
