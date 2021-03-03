import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryManagePage } from './category-manage.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryManagePageRoutingModule {}
