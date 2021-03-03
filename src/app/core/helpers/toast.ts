import { ToastController } from '@ionic/angular';

export class Toast{
    static async message(message : string, toastCtrl: ToastController) {
        let toast = await toastCtrl.create({
          // showCloseButton: true,
            message: message,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
      }
}