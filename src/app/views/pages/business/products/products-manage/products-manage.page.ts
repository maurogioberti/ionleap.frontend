import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { ProductResponse } from 'src/app/models/responses/product.response';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { ProductManagePage } from '../product-manage/product-manage.page';
import { ResponsiveTable } from 'src/app/core/models/component/responsive.table';
import { OnInitResponsiveTable } from 'src/app/core/pages/oninit.responsive.table';

@Component({
  selector: 'app-products-manage',
  templateUrl: './products-manage.page.html',
  styleUrls: ['./products-manage.page.scss'],
})
export class ProductsManagePage implements OnInitResponsiveTable {
  responsiveTable: ResponsiveTable<ProductResponse> = new ResponsiveTable<ProductResponse>(ProductManagePage);
  
  constructor(private productService: ProductService, public toastCtrl: ToastController) {
  }
  
  async ngOnInit() {
    await this.get();
    this.responsiveTable.addColumn("description", "Nombre", true, true);
    this.responsiveTable.addColumn("detail", "Descripción", false, true);
    this.responsiveTable.addColumn("quantity", "Cantidad", true, true);
    this.responsiveTable.addColumn("price", "Precio", true, true);
    this.responsiveTable.addColumn("priceBusiness", "Precio Mayorista", true, false);
  }

  async get() { 
      let result: BaseResponse<ProductResponse[]> = await Subscriptor.subscript(this.productService.getall());
      if(result.success){
        this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));;
      }
      else {
        Toast.message(result.message, this.toastCtrl);
      }
  }

  async getLike(like : string) { 
    let result: BaseResponse<ProductResponse[]>;
    if(like == "") {
      result = await Subscriptor.subscript(this.productService.getall());
    }
    else {
      result = await Subscriptor.subscript(this.productService.getlike(like));
    }
    
    if (result.success) {
      this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }
}