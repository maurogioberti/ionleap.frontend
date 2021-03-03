import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Subscriptor } from 'src/app/core/helpers/subscriptor';
import { Toast } from 'src/app/core/helpers/toast';
import { BaseResponse } from 'src/app/core/models/response/base.response';
import { AuthenticationRequest } from 'src/app/models/requests/authentication.request';
import { AuthenticationResponse } from 'src/app/models/responses/authentication.response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  error_messages = {
    'username': [
      { type: 'required', message: 'El Usuario es requerido' },
      { type: 'minlength', message: 'El usuario debe ser al menos 4 caracteres' },
      { type: 'maxlength', message: 'El usuario debe ser como máximo 20 caracteres' },
      { type: 'pattern', message: 'El formato del usuario no es el correcto' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'El contraseña debe ser al menos 4 caracteres' },
      { type: 'maxlength', message: 'El contraseña debe ser como máximo 20 caracteres' },
      { type: 'pattern', message: 'El formato del contraseña no es el correcto' }
    ]
  }
  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private userService: UserService, public toastCtrl: ToastController) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_.+-]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_.+-]+$')
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')La contraseña debe tener numeros, mayusculas, minusculas y letras.
      ]))
    })
  }

  ngOnInit() {
  }

  async login() {
    let authenticationRequest: AuthenticationRequest = this.loginForm.value as AuthenticationRequest;

    let result: BaseResponse<AuthenticationResponse> = await Subscriptor.subscript(this.userService.authenticate(authenticationRequest));
    if (result.success) {
      this.userService.setStorage(result.data);
      this.navCtrl.navigateRoot('home');
    }
    else {
      Toast.message(result.message, this.toastCtrl);
    }

  }

}
