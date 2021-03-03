import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Form } from 'src/app/core/helpers/form';
import { Modal } from 'src/app/core/helpers/modal';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { UserSession } from 'src/app/core/models/session/user.session';
import { BrandRequest } from 'src/app/models/requests/brand.request';
import { BrandResponse } from 'src/app/models/responses/brand.response';
import { ProductResponse } from 'src/app/models/responses/product.response';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-brand-manage',
  templateUrl: './brand-manage.page.html',
  styleUrls: ['./brand-manage.page.scss'],
})
export class BrandManagePage implements OnInit {
  brandForm: FormGroup;
  brandRequest: BrandRequest;
  inputCost: any;
  inputPrice: any;
  inputPriceBusiness: any;
  modify: boolean;
  @Input() item: BrandRequest;
  products: ProductResponse[] = [];

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private productService: ProductService, private brandService: BrandService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.modify = this.item != null;
    if (this.modify) {
      this.getProducts();
    }
    this.prepareForm();
  }

  async getProducts() {
    let result: BaseResponse<ProductResponse[]> = await Subscriptor.subscript(this.productService.getall());
    if (result.success) {
      let i = 0;
      for (let product of result.data) {
        if (i == 5){
          return;
        }
        if (product.categoryIdentity == this.item.identity) {
          this.products.push(product);
        }
        i++;
      }
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }

  async remove() {
    const alert = await this.alertCtrl.create({
      header: `Confirmar Eliminar ${this.item.description}`,
      message: `¿ Estas seguro de eliminar <strong>${this.item.description}</strong> ?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
          }
        }, {
          text: 'Si',
          handler: async () => {
            let result: BaseResponse<ProductResponse> = null;

            result = await Subscriptor.subscript(this.brandService.remove(this.item.identity));
        
            if (result.success) {
              Toast.message(`Se ha eliminado ${this.item.description} con éxito.`, this.toastCtrl);
              this.modalCtrl.dismiss();
            }
            else {
              Toast.message(result.message, this.toastCtrl);
            }
          }
        }
      ]
    });
    
    await alert.present();
  }

  async action() {
    if (Form.isValid(this.brandForm, this.toastCtrl)) {
      this.brandRequest = this.brandForm.getRawValue() as BrandRequest;
      let result: BaseResponse<BrandResponse> = null;

      if (this.modify) {
        this.brandRequest.userModifiedIdentity = UserSession.user.identity;
        this.brandRequest.dateModified = new Date();
        this.brandRequest.identity = this.item.identity;
        result = await Subscriptor.subscript(this.brandService.modify(this.brandRequest));
      }
      else {
        this.brandRequest.userCreatedIdentity = UserSession.user.identity;
        result = await Subscriptor.subscript(this.brandService.add(this.brandRequest));
      }

      if (result.success) {
        if(this.modify){
          Toast.message(`Se ha modificado ${this.item.description} con éxito.`, this.toastCtrl);
          this.modalCtrl.dismiss();
        }
        else {
          Modal.callModalSuccess(this.modalCtrl);
        }
      }
      else {
        Toast.message(result.message, this.toastCtrl);
      }
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  private prepareForm() {
      this.brandForm = this.formBuilder.group({
        identity: new FormControl(this.modify ? this.item.identity : '', Validators.compose([
        ])),
        description: new FormControl(this.modify ? this.item.description : '', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
        ])),
        detail: new FormControl(this.modify ? this.item.detail : '', Validators.compose([
        ])),
      })
      
      if(!this.modify)
        this.brandForm.removeControl('identity');
  }
}