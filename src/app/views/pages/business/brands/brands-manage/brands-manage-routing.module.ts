import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsManagePage } from './brands-manage.page';

const routes: Routes = [
  {
    path: '',
    component: BrandsManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandsManagePageRoutingModule {}
