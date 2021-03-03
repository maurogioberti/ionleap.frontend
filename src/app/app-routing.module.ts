import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/pages/intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./views/pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'successmodal',
    loadChildren: () => import('./views/modals/successmodal/successmodal.module').then( m => m.SuccessmodalPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'brand-manage',
    loadChildren: () => import('./views/pages/business/brands/brand-manage/brand-manage.module').then( m => m.BrandManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'brands-manage',
    loadChildren: () => import('./views/pages/business/brands/brands-manage/brands-manage.module').then( m => m.BrandsManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'category-manage',
    loadChildren: () => import('./views/pages/business/categories/category-manage/category-manage.module').then( m => m.CategoryManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'categories-manage',
    loadChildren: () => import('./views/pages/business/categories/categories-manage/categories-manage.module').then( m => m.CategoriesManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'customer-manage',
    loadChildren: () => import('./views/pages/business/customers/customer-manage/customer-manage.module').then( m => m.CustomerManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'customers-manage',
    loadChildren: () => import('./views/pages/business/customers/customers-manage/customers-manage.module').then( m => m.CustomersManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'products-manage',
    loadChildren: () => import('./views/pages/business/products/products-manage/products-manage.module').then( m => m.ProductsManagePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'product-manage',
    loadChildren: () => import('./views/pages/business/products/product-manage/product-manage.module').then( m => m.ProductManagePageModule),
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
