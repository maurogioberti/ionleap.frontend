import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveTableComponent } from './responsive-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  exports: [ResponsiveTableComponent],
  declarations: [ResponsiveTableComponent],
  imports: [
    CommonModule,
    NgxDatatableModule
  ]
})
export class ResponsiveTableModule { }