import { Component, OnInit, Input } from '@angular/core';
import { CategoryRequest } from 'src/app/models/requests/category.request';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryResponse } from 'src/app/models/responses/category.response';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { Toast } from 'src/app/core/helpers/toast';
import { Modal } from 'src/app/core/helpers/modal';
import { Form } from 'src/app/core/helpers/form';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from 'src/app/models/responses/product.response';
import { UserSession } from 'src/app/core/models/session/user.session';


@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.page.html',
  styleUrls: ['./category-manage.page.scss'],
})
export class CategoryManagePage implements OnInit {
  categoryForm: FormGroup;
  categoryRequest: CategoryRequest;
  inputCost: any;
  inputPrice: any;
  inputPriceBusiness: any;
  modify: boolean;
  @Input() item: CategoryRequest;
  products: ProductResponse[] = [];

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private productService: ProductService, private categoryService: CategoryService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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

            result = await Subscriptor.subscript(this.categoryService.remove(this.item.identity));
        
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
    if (Form.isValid(this.categoryForm, this.toastCtrl)) {
      this.categoryRequest = this.categoryForm.getRawValue() as CategoryRequest;
      let result: BaseResponse<CategoryResponse> = null;

      if (this.modify) {
        this.categoryRequest.userModifiedIdentity = UserSession.user.identity;
        this.categoryRequest.dateModified = new Date();
        this.categoryRequest.identity = this.item.identity;
        result = await Subscriptor.subscript(this.categoryService.modify(this.categoryRequest));
      }
      else {
        this.categoryRequest.userCreatedIdentity = UserSession.user.identity;
        result = await Subscriptor.subscript(this.categoryService.add(this.categoryRequest));
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
      this.categoryForm = this.formBuilder.group({
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
        this.categoryForm.removeControl('identity');
  }
}