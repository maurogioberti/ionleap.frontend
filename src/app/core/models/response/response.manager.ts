import { ToastController, NavController } from '@ionic/angular';
import { BaseResponse } from './base.response';
import { Toast } from '../../helpers/toast';

export class ResponseManager{
  
    static async navigate(view : string, navCtrl : NavController, result : BaseResponse<any>, toastCtrl: ToastController) {
        if(result.success)
        {
          navCtrl.navigateRoot(view);
        }
        else
        {
          Toast.message(result.message, toastCtrl);
        }
      }
}