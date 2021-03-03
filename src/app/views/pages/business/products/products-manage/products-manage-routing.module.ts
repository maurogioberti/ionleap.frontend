import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsManagePage } from './products-manage.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsManagePageRoutingModule {}
