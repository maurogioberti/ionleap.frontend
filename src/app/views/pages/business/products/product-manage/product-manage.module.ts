import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductManagePageRoutingModule } from './product-manage-routing.module';

import { ProductManagePage } from './product-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductManagePageRoutingModule
  ],
  declarations: [ProductManagePage]
})
export class ProductManagePageModule {}
