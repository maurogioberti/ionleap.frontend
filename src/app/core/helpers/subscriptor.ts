import { Observable, throwError, TimeoutError } from 'rxjs';
import { BaseResponse } from '../models/response/base.response';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { Toast } from './toast';
import { environment } from 'src/environments/environment';

export class Subscriptor {
  private static baseResponse: BaseResponse<any>;

  static subscriptRedirect(http: Observable<BaseResponse<any>>, redirect: string, navCtrl: NavController, toastCtrl: ToastController) {
    http.subscribe(result => {
      if (!environment.production)
        console.log(result);

      if (result.success) {
        navCtrl.navigateRoot(redirect);
      }
      else {
        Toast.message(result.message, toastCtrl);
      }
    }, (error: HttpErrorResponse) => {
      if (!environment.production)
        console.log(error);
      let message: string = error.error.message;
      if (message === "") {
        message = error.message;
      }
    });
  }

  static async subscript(http: Observable<BaseResponse<any>>) {

    //let response = http.toPromise() as unknown as BaseResponse<any>;
    await http.toPromise().then((p) => {
      this.setResponse(p as BaseResponse<any>);
    })
      .catch((e) => {
        if (e instanceof HttpErrorResponse) {
          let message: string = e.error.message;

          if (message === "" || message === undefined) {
            message = e.message;
          }

          let result: BaseResponse<any> = {
            success: false,
            message: message,
            data: null
          }

          console.log(e)

          this.setResponse(result);
        }
      });


    if (this.getResponse() == undefined) {
      const result: BaseResponse<any> = {
        success: false,
        message: "No se puede establecer comunicación con el servidor",
        data: null
      };
      this.setResponse(result);
    }

    return this.getResponse();
  }

  static setResponse(baseResponse: BaseResponse<any>) {
    this.baseResponse = baseResponse;
  }

  static getResponse() {
    return this.baseResponse;
  }
}