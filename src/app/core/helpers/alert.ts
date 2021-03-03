import { AlertController } from '@ionic/angular';

export class Alert {
    static async alertOk(alertCtrl: AlertController, header: string, title: string, subtitle: string) {
            const alert = await alertCtrl.create({
              cssClass: 'my-custom-class',
              header: header,
              subHeader: title,
              message: subtitle,
              buttons: ['Aceptar']
            });
        
            await alert.present();
    }
}