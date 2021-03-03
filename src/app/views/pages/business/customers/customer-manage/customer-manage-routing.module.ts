import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerManagePage } from './customer-manage.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagePageRoutingModule {}
