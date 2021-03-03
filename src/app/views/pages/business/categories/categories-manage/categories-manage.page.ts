import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { CategoryResponse } from 'src/app/models/responses/category.response';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { CategoryManagePage } from '../category-manage/category-manage.page';
import { ResponsiveTable } from 'src/app/core/models/component/responsive.table';
import { OnInitResponsiveTable } from 'src/app/core/pages/oninit.responsive.table';

@Component({
  selector: 'app-categories-manage',
  templateUrl: './categories-manage.page.html',
  styleUrls: ['./categories-manage.page.scss'],
})
export class CategoriesManagePage implements OnInitResponsiveTable {
  responsiveTable: ResponsiveTable<CategoryResponse> = new ResponsiveTable<CategoryResponse>(CategoryManagePage);

  constructor(private categoryService: CategoryService, public toastCtrl: ToastController) {
  }
  
  async ngOnInit() {
    await this.get();
    this.responsiveTable.addColumn("description", "Tipo de Producto", true, true);
    this.responsiveTable.addColumn("detail", "Descripción", true, true);
  }

  async get() { 
      let result: BaseResponse<CategoryResponse[]> = await Subscriptor.subscript(this.categoryService.getall());
      if(result.success){
        this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));
      }
      else {
        Toast.message(result.message, this.toastCtrl);
      }
  }

  async getLike(like : string) { 
    let result: BaseResponse<CategoryResponse[]>;
    if(like == "") {
      result = await Subscriptor.subscript(this.categoryService.getall());
    }
    else {
      result = await Subscriptor.subscript(this.categoryService.getlike(like));
    }
    
    if (result.success) {
      this.responsiveTable.rows = result.data.sort((a,b) => a.description.localeCompare(b.description));
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }
}