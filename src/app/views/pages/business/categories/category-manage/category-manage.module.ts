import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryManagePageRoutingModule } from './category-manage-routing.module';

import { CategoryManagePage } from './category-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoryManagePageRoutingModule
  ],
  declarations: [CategoryManagePage]
})
export class CategoryManagePageModule {}
