import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AppResolver } from '../services/resolvers/app-resolver.service';
import { OrderResolver } from '../services/resolvers/order-resolver.service';
import { AuthGuard } from '../services/guards/auth.guard';
import { AdminResolver } from '../services/resolvers/admin-resolver.service';
import { AdminGuard } from '../services/guards/admin.guard';
import { SplashComponent } from '../shared/pages/splash/splash.component';
import { UserResolver } from '../services/resolvers/user-resolver.service';
import { BookingResolver } from '../services/resolvers/booking-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-home/tab-home.module').then(m => m.TabHomePageModule)
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-admin/tab-admin.module').then(m => m.TabAdminPageModule),
            canActivate: [AuthGuard, AdminGuard],
            resolve: [AdminResolver, BookingResolver]
          }
        ]
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-menu/tab-menu.module').then(m => m.TabMenuPageModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-order/tab-order.module').then(m => m.TabOrderPageModule),
            canActivate: [AuthGuard]
          }
        ],
        resolve: [OrderResolver]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-more/tab-more.module').then(m => m.TabMorePageModule),
            resolve: [BookingResolver]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },

    ],
    resolve: [AppResolver]
  },
  {
    path: '',
    component: SplashComponent,
    pathMatch: 'full',
    resolve: [UserResolver]
  },
  { path: '**', redirectTo: '/tabs/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
