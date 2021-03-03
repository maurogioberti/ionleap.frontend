import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../core/models/response/base.response';
import { AuthenticationResponse } from '../models/responses/authentication.response';
import { AuthenticationRequest } from '../models/requests/authentication.request';
import { User } from '../models/entities/user';
import { UserResponse } from '../models/responses/user.response';
import { Objects } from '../core/utils/objects';
import { Cryptography } from '../core/utils/cryptography';
import { RestServiceManager } from '../core/services/rest.service.manager';
import { UserRequest } from '../models/requests/user.request';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestServiceManager<UserRequest, UserResponse> {

    authenticationState = new BehaviorSubject(false);
    cryptography = new Cryptography();
    
    constructor(protected http: HttpClient) {
      super(http, "user");
    }
    
    public authenticate(user: AuthenticationRequest) {
        const url = `${this.serviceUrl}/${Objects.getMethodName()}`;
        return this.http.post<BaseResponse<AuthenticationResponse>>(url, user);
    }
    
    setStorage(authentication: AuthenticationResponse) {
      localStorage.setItem(this.cryptography.encrypt(environment.tokenKey), this.cryptography.encrypt(JSON.stringify(authentication.token)));
      localStorage.setItem(this.cryptography.encrypt(environment.userKey), this.cryptography.encrypt(JSON.stringify(authentication.user)));
    }

    getToken() {
      return this.localStorageToken();
    }

    loggednIn() {
      if (this.getToken() !== "")
        {
          return true; 
        }
      return false;
    }

    public logout() {
      localStorage.removeItem(this.cryptography.encrypt(environment.tokenKey));
      localStorage.removeItem(this.cryptography.encrypt(environment.userKey));
    }

    public localStorageUser() : User {
      return JSON.parse(this.cryptography.decrypt(localStorage.getItem(this.cryptography.encrypt(environment.userKey))));
    }

    public localStorageToken() : String {
      return JSON.parse(this.cryptography.decrypt(localStorage.getItem(this.cryptography.encrypt(environment.tokenKey))));
    }
}