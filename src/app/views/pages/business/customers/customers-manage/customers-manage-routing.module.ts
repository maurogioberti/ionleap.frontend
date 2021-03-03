import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersManagePage } from './customers-manage.page';

const routes: Routes = [
  {
    path: '',
    component: CustomersManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersManagePageRoutingModule {}
