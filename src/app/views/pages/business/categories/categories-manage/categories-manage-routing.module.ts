import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesManagePage } from './categories-manage.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesManagePageRoutingModule {}
