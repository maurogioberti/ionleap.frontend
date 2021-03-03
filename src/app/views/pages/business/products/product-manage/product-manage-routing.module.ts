import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductManagePage } from './product-manage.page';

const routes: Routes = [
  {
    path: '',
    component: ProductManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagePageRoutingModule {}
