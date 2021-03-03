import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.page.html',
  styleUrls: ['./successmodal.page.scss'],
})
export class SuccessmodalPage implements OnInit {

  constructor(private modalCtrl:ModalController, private navCtrl:NavController, private alertCtrl:AlertController) { }

  ngOnInit() {
    setTimeout(() => {
      this.presentConfirm();
    }, 3000);
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Continuar acción',
      message: '¿Deseas continuar con esta acción?',
      buttons: [
        {
          text: 'Si',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.dismiss();
          }
        }, {
          text: 'No',
          handler: () => {
            this.goHome();
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
