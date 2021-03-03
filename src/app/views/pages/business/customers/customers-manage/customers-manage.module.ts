import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersManagePageRoutingModule } from './customers-manage-routing.module';

import { CustomersManagePage } from './customers-manage.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ResponsiveTableModule } from 'src/app/core/components/responsive-table/responsive-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ResponsiveTableModule,
    CustomersManagePageRoutingModule
  ],
  declarations: [CustomersManagePage]
})
export class CustomersManagePageModule {}
