import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserActivityService } from './user-activity.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _registeredUser: UserModel = {
        username: 'test',
        password: 'qwerty',
    };

    constructor(
        private userService: UserService,
        private userActivityService: UserActivityService,
        private router: Router
    ) {}

    public addRegisteredUserToLocalStorage(): void {
        localStorage.clear();
        localStorage.setItem(
            'registeredUser',
            JSON.stringify(this._registeredUser)
        );
    }

    public isUserValid(user: UserModel): boolean {
        const registeredUser = this.getRegisteredUserFromLocalStorage();

        return (
            registeredUser.username === user.username &&
            registeredUser.password === user.password
        );
    }

    public autoLogin(): void {
        const user: UserModel = JSON.parse(localStorage.getItem('userData'));

        if (user) {
            this.userService.setCurrentUser(user);
        }
    }

    public logout(): void {
        this.userActivityService.updateTimer(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/report']);
    }

    private getRegisteredUserFromLocalStorage(): UserModel {
        return JSON.parse(localStorage.getItem('registeredUser'));
    }
}
