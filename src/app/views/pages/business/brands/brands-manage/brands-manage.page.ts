import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BrandService } from 'src/app/services/brand.service';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { BrandResponse } from 'src/app/models/responses/brand.response';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { BrandManagePage } from '../brand-manage/brand-manage.page';
import { ResponsiveTable } from 'src/app/core/models/component/responsive.table';
import { OnInitResponsiveTable } from 'src/app/core/pages/oninit.responsive.table';

@Component({
  selector: 'app-brands-manage',
  templateUrl: './brands-manage.page.html',
  styleUrls: ['./brands-manage.page.scss'],
})
export class BrandsManagePage implements OnInitResponsiveTable {
  responsiveTable: ResponsiveTable<BrandResponse> = new ResponsiveTable<BrandResponse>(BrandManagePage);

  constructor(private brandService: BrandService, public toastCtrl: ToastController) {
  }

  async ngOnInit() {
    await this.get();
    this.responsiveTable.addColumn("description", "Marca", true, true);
    this.responsiveTable.addColumn("detail", "Descripción", true, true);
  }

  async get() {
    let result: BaseResponse<BrandResponse[]> = await Subscriptor.subscript(this.brandService.getall());
    if (result.success) {
      this.responsiveTable.rows = result.data.sort((a, b) => a.description.localeCompare(b.description));
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }

  async getLike(like: string) {
    let result: BaseResponse<BrandResponse[]>;
    if (like == "") {
      result = await Subscriptor.subscript(this.brandService.getall());
    }
    else {
      result = await Subscriptor.subscript(this.brandService.getlike(like));
    }

    if (result.success) {
      this.responsiveTable.rows = result.data.sort((a, b) => a.description.localeCompare(b.description));
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }
}