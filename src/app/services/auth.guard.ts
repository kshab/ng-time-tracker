import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> | boolean {
        return this.userService.currentUser.pipe(
            take(1),
            map((user) => {
                if (user && this.authService.isUserValid(user)) {
                    return true;
                }

                this.router.navigate(['/auth']);

                return false;
            })
        );
    }
}
