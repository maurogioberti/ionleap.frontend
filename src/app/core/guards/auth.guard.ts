import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public user: UserService) { }

    canActivate(): boolean {
        return this.user.loggednIn();
    }
}