import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagePageRoutingModule } from './products-manage-routing.module';

import { ProductsManagePage } from './products-manage.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ResponsiveTableModule } from 'src/app/core/components/responsive-table/responsive-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ResponsiveTableModule,
    ProductsManagePageRoutingModule
  ],
  declarations: [ProductsManagePage]
})
export class ProductsManagePageModule {}
