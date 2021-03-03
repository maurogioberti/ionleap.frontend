import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Toast } from '../helpers/toast';
import { BaseResponse } from '../models/response/base.response';


@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router,
    private userService: UserService,
    public toastCtrl: ToastController
  ) { }
  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.router.url == '/login') {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + this.userService.getToken(),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            if (!environment.production) {
              console.log(request);
            }
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            
            if (err.status === 401) {
              this.router.navigate(['/login']);
              Toast.message(err.status + " - " + err.statusText + ": " + err.message + ".", this.toastCtrl);
            }

            console.log("ResponseStatus: " + err.statusText + "HttpErrorResponse: " + err.message)
          }
        })
      )

  };

}