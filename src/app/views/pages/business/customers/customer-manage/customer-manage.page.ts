import { Component, OnInit, Input } from '@angular/core';
import { CustomerRequest } from 'src/app/models/requests/customer.request';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerResponse } from 'src/app/models/responses/customer.response';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { Toast } from 'src/app/core/helpers/toast';
import { Modal } from 'src/app/core/helpers/modal';
import { Form } from 'src/app/core/helpers/form';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from 'src/app/models/responses/product.response';
import { UserSession } from 'src/app/core/models/session/user.session';


@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.page.html',
  styleUrls: ['./customer-manage.page.scss'],
})
export class CustomerManagePage implements OnInit {
  customerForm: FormGroup;
  customerRequest: CustomerRequest;
  inputCost: any;
  inputPrice: any;
  inputPriceBusiness: any;
  modify: boolean;
  @Input() item: CustomerRequest;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private productService: ProductService, private customerService: CustomerService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.modify = this.item != null;
    this.prepareForm();
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

            result = await Subscriptor.subscript(this.customerService.remove(this.item.identity));
        
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
    if (Form.isValid(this.customerForm, this.toastCtrl)) {
      this.customerRequest = this.customerForm.getRawValue() as CustomerRequest;
      let result: BaseResponse<CustomerResponse> = null;
      this.customerRequest.salary = Number.parseFloat(this.customerRequest.salary.toString());
      this.customerRequest.personalId = this.customerRequest.personalId == null ? null : Number.parseFloat(this.customerRequest.personalId.toString());
      this.customerRequest.mobile = this.customerRequest.mobile.toString();
      if(isNaN(this.customerRequest.personalId)){
        this.customerRequest.personalId = null;
      }

      if (this.modify) {
        this.customerRequest.userModifiedIdentity = UserSession.user.identity;
        this.customerRequest.dateModified = new Date();
        this.customerRequest.identity = this.item.identity;
        result = await Subscriptor.subscript(this.customerService.modify(this.customerRequest));
      }
      else {
        this.customerRequest.userCreatedIdentity = UserSession.user.identity;
        result = await Subscriptor.subscript(this.customerService.add(this.customerRequest));
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
      this.customerForm = this.formBuilder.group({
        identity: new FormControl(this.modify ? this.item.identity : '', Validators.compose([
        ])),
        description: new FormControl(this.modify ? this.item.description : '', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$"),
          Validators.required
        ])),
        detail: new FormControl(this.modify ? this.item.detail : '', Validators.compose([
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
        ])),
        name: new FormControl(this.modify ? this.item.name : '', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
        ])),
        surname: new FormControl(this.modify ? this.item.surname : '', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
        ])),
        businessPrice: new FormControl(this.modify ? this.item.businessPrice : false, Validators.compose([
          Validators.required,
        ])),
        personalId: new FormControl(this.modify ? this.item.personalId : '', Validators.compose([
          Validators.pattern('^[0-9]+$')
        ])),
        phone: new FormControl(this.modify ? this.item.phone : '', Validators.compose([
          Validators.pattern('^[0-9]+$')
        ])),
        mobile: new FormControl(this.modify ? this.item.mobile : '', Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ])),
        email: new FormControl(this.modify ? this.item.email : '', Validators.compose([
        ])),
        address: new FormControl(this.modify ? this.item.address : '', Validators.compose([
          Validators.minLength(3),
          Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
        ])),
        salary: new FormControl(this.modify ? this.item.salary.toFixed(2) : '0.00', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
        ])),
      })
      
      if(!this.modify)
        this.customerForm.removeControl('identity');
  }
}