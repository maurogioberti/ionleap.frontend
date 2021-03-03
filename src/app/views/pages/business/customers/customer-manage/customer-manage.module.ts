import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerManagePageRoutingModule } from './customer-manage-routing.module';

import { CustomerManagePage } from './customer-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CustomerManagePageRoutingModule
  ],
  declarations: [CustomerManagePage]
})
export class CustomerManagePageModule {}
