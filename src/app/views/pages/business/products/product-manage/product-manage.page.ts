import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { ProductRequest } from 'src/app/models/requests/product.request';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductResponse } from 'src/app/models/responses/product.response';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { Toast } from 'src/app/core/helpers/toast';
import { Modal } from 'src/app/core/helpers/modal';
import { Form } from 'src/app/core/helpers/form';
import { BrandResponse } from 'src/app/models/responses/brand.response';
import { CategoryResponse } from 'src/app/models/responses/category.response';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserSession } from 'src/app/core/models/session/user.session';
import { asapScheduler } from 'rxjs';
import { Strings } from 'src/app/core/utils/strings';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.page.html',
  styleUrls: ['./product-manage.page.scss'],
})
export class ProductManagePage implements AfterContentInit {
  productForm: FormGroup;
  productRequest: ProductRequest;
  inputCost: any;
  inputPrice: any;
  inputPriceBusiness: any;
  modify: boolean;
  @Input() item: ProductRequest;
  brands: BrandResponse[] = [];
  categories: CategoryResponse[] = [];
  brandSelected: BrandResponse;
  categorySelected: CategoryResponse;

  pictureBinary: string = '';

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private productService: ProductService, private brandService: BrandService, private categoryService: CategoryService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  async ngAfterContentInit() {
    this.modify = this.item != null;
    this.prepareForm();

    await this.getBrands();
    await this.getCategories();
    if(this.item != null) {
      this.brandSelected = this.brands.filter(b => b.identity == this.item.brandIdentity)[0];
      this.categorySelected = this.categories.filter(c => c.identity == this.item.brandIdentity)[0];
      this.pictureBinary = this.item.picture;
    }
    
  }

  async getBrands() {
    let result: BaseResponse<BrandResponse[]> = await Subscriptor.subscript(this.brandService.getall());
    if (result.success) {
      this.brands = result.data;
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }

  async getCategories() {
    let result: BaseResponse<CategoryResponse[]> = await Subscriptor.subscript(this.categoryService.getall());
    if (result.success) {
      this.categories = result.data;
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }
  }

  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // let  pattern = /image-*/;
    let reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.pictureBinary = reader.result;
  }

  async action() {
    if (Form.isValid(this.productForm, this.toastCtrl)) {
      this.productRequest = this.productForm.getRawValue() as ProductRequest;
      this.productRequest.cost = Number.parseFloat(this.productRequest.cost.toString());
      this.productRequest.price = Number.parseFloat(this.productRequest.price.toString());
      this.productRequest.priceBusiness = Number.parseFloat(this.productRequest.priceBusiness.toString());
      this.productRequest.quantity = Number.parseInt(this.productRequest.quantity.toString());
      this.productRequest.brandIdentity = Number.parseInt(this.productRequest.brandIdentity.toString());
      this.productRequest.categoryIdentity = Number.parseInt(this.productRequest.categoryIdentity.toString());
      this.productRequest.picture = Strings.isNullOrEmpty(this.productRequest.picture) ? '' : this.pictureBinary;
      
      let result: BaseResponse<ProductResponse> = null;

      if (this.modify) {
        this.productRequest.userModifiedIdentity = UserSession.user.identity;
        this.productRequest.dateModified = new Date();
        this.productRequest.identity = this.item.identity;
        result = await Subscriptor.subscript(this.productService.modify(this.productRequest));
      }
      else {
        this.productRequest.userCreatedIdentity = UserSession.user.identity;
        result = await Subscriptor.subscript(this.productService.add(this.productRequest));
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

            result = await Subscriptor.subscript(this.productService.remove(this.item.identity));
        
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

  computePrice() {
    try {
      this.inputPrice = (this.inputCost * 1.3).toFixed(2);
      this.inputPriceBusiness = (this.inputCost * 1.2).toFixed(2);
      this.inputCost = (this.inputCost).toFixed(2);
      if (this.inputPrice == "NaN") {
        this.cleanPriceValues();
      }
    }
    catch{
      this.cleanPriceValues();
    }

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  private cleanPriceValues() {
    this.inputCost = "";
    this.inputPrice = "";
    this.inputPriceBusiness = "";
  }

  private prepareForm(){
    this.productForm = this.formBuilder.group({
      identity: new FormControl(this.modify ? this.item.identity : '', Validators.compose([
      ])),
      description: new FormControl(this.modify ? this.item.description : '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ])),
      cost: new FormControl(this.modify ? this.item.cost.toFixed(2) : '', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
      ])),
      price: new FormControl(this.modify ? this.item.price.toFixed(2) : '', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
      ])),
      priceBusiness: new FormControl(this.modify ? this.item.priceBusiness.toFixed(2) : '', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
      ])),
      quantity: new FormControl(this.modify ? this.item.quantity : '', Validators.compose([
        Validators.required,
      ])),
      webSite: new FormControl(this.modify ? this.item.webSite : '', Validators.compose([
        Validators.required,
      ])),
      picture: new FormControl(this.modify ? this.item.picture : '', Validators.compose([
      ])),
      brandIdentity: new FormControl(this.modify ? this.item.brandIdentity : '', Validators.compose([
        Validators.required,
      ])),
      categoryIdentity: new FormControl(this.modify ? this.item.categoryIdentity : '', Validators.compose([
        Validators.required,
      ])),
      detail: new FormControl(this.modify ? this.item.detail : '', Validators.compose([
        Validators.maxLength(300),
      ]))
    })

    if(this.modify){
      this.inputCost = this.item.cost.toFixed(2);
      this.inputPrice = this.item.price.toFixed(2);
      this.inputPriceBusiness = this.item.priceBusiness.toFixed(2);
    }
    else {
      this.productForm.removeControl('identity');
    }
  }
}