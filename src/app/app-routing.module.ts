import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeResolver } from './services/resolvers/home-resolver.service';
import { SigninComponent } from './shared/pages/signin/signin.component';
import { SignupComponent } from './shared/pages/signup/signup.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { UserResolver } from './services/resolvers/user-resolver.service';
// import { UserResolver } from './services/resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    resolve: [UserResolver],
  },
  {
    path: 'tab-home',
    loadChildren: () => import('./tab-home/tab-home.module').then(m => m.TabHomePageModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tab-menu',
    loadChildren: () => import('./tab-menu/tab-menu.module').then(m => m.TabMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-order',
    loadChildren: () => import('./tab-order/tab-order.module').then(m => m.TabOrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-more',
    loadChildren: () => import('./tab-more/tab-more.module').then(m => m.TabMorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-admin',
    loadChildren: () => import('./tab-admin/tab-admin.module').then(m => m.TabAdminPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'terms',
    loadChildren: () => import('./shared/pages/terms/terms.module').then(m => m.TermsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
