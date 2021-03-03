import { SuccessmodalPage } from 'src/app/views/modals/successmodal/successmodal.page';
import { ModalController } from '@ionic/angular';

export class Modal {
    static async callModalSuccess(modalCtrl: ModalController) {
        const modal = await modalCtrl.create({
            component: SuccessmodalPage,
            backdropDismiss: true
        });

        return await modal.present();
    }
}