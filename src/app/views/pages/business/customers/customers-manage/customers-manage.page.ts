import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { CustomerResponse } from 'src/app/models/responses/customer.response';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { CustomerManagePage } from '../customer-manage/customer-manage.page';
import { ResponsiveTable } from 'src/app/core/models/component/responsive.table';
import { OnInitResponsiveTable } from 'src/app/core/pages/oninit.responsive.table';

@Component({
  selector: 'app-customers-manage',
  templateUrl: './customers-manage.page.html',
  styleUrls: ['./customers-manage.page.scss'],
})
export class CustomersManagePage implements OnInitResponsiveTable {
  responsiveTable: ResponsiveTable<CustomerResponse> = new ResponsiveTable<CustomerResponse>(CustomerManagePage);

  constructor(private customerService: CustomerService, public toastCtrl: ToastController) {
  }
  
  async ngOnInit() {
    await this.get();
    this.responsiveTable.addColumn("name", "Nombre", false, true);
    this.responsiveTable.addColumn("surname", "Apellido", false, true);
    this.responsiveTable.addColumn("description", "Apodo", true, true);
    this.responsiveTable.addColumn("salary", "Deuda", true, true);
    this.responsiveTable.addColumn("address", "Dirección", true, false);
    this.responsiveTable.addColumn("mobile", "Teléfono", true, true);
  }

  async get() { 
      let result: BaseResponse<CustomerResponse[]> = await Subscriptor.subscript(this.customerService.getall());
      if(result.success){
        this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));
      }
      else {
        Toast.message(result.message, this.toastCtrl);
      }
  }

  async getLike(like : string) { 
    let result: BaseResponse<CustomerResponse[]>;
    if(like == "") {
      result = await Subscriptor.subscript(this.customerService.getall());
    }
    else {
      result = await Subscriptor.subscript(this.customerService.getlike(like));
    }
    
    if (result.success) {
      this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }
}