import { Toast } from './toast';
import { FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

export class Form {
    static isValid(form: FormGroup, toastCtrl: ToastController) : boolean {
        let formValid: boolean = form.valid;
        if (!formValid) {
            Toast.message("No se han completado todos los valores requeridos correctamente.", toastCtrl);
        }
        
        return formValid;
    }
}