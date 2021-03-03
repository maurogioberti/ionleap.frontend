import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandManagePage } from './brand-manage.page';

const routes: Routes = [
  {
    path: '',
    component: BrandManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandManagePageRoutingModule {}
