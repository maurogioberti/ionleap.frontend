import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandsManagePageRoutingModule } from './brands-manage-routing.module';

import { BrandsManagePage } from './brands-manage.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ResponsiveTableModule } from 'src/app/core/components/responsive-table/responsive-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ResponsiveTableModule,
    BrandsManagePageRoutingModule
  ],
  declarations: [BrandsManagePage]
})
export class BrandsManagePageModule {}
