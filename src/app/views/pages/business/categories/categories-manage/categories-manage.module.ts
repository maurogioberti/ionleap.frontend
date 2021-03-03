import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesManagePageRoutingModule } from './categories-manage-routing.module';

import { CategoriesManagePage } from './categories-manage.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ResponsiveTableModule } from 'src/app/core/components/responsive-table/responsive-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ResponsiveTableModule,
    CategoriesManagePageRoutingModule
  ],
  declarations: [CategoriesManagePage]
})
export class CategoriesManagePageModule {}
