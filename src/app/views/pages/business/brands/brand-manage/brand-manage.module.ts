import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandManagePageRoutingModule } from './brand-manage-routing.module';

import { BrandManagePage } from './brand-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BrandManagePageRoutingModule
  ],
  declarations: [BrandManagePage]
})
export class BrandManagePageModule {}
