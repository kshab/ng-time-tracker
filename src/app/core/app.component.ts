import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";

import { AuthService } from "../services/auth.service";
import { UserActivityService } from "../services/user-activity.service";
import { Subscription } from "rxjs";
import { UserService } from "../services/user.service";
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
    private isUserAuthenticated = false;
    private isAuthPage = true;
    private page: string | null = null;
    private userSubscription: Subscription;
    private routerSubscription: Subscription;

    @HostListener("window:click") onClick() {
        if (this.isUserAuthenticated) {
            this.userActivityService.updateTimer(this.page);
            this.userActivityService.startInactivityTimer();
        }
    }

    @HostListener("window:keyup") onKeyup() {
        if (this.isUserAuthenticated) {
            this.userActivityService.updateTimer(this.page);
            this.userActivityService.startInactivityTimer();
        }
    }

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private userActivityService: UserActivityService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.userSubscription = this.userService.currentUser
            .subscribe(user => {
                this.isUserAuthenticated = !!user;
            });

        this.routerSubscription = this.router.events
            .pipe(
                filter((event: Event) => event instanceof NavigationEnd)
            )
            .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
                const currentPage = urlAfterRedirects.substr(1);

                this.page = currentPage;

                if (currentPage === 'auth') {
                    this.isAuthPage = true;
                    this.authService.addRegisteredUserToLocalStorage();
                } else {
                    this.isAuthPage = false;
                    if (currentPage !== 'report') {
                        this.userActivityService.startInactivityTimer();
                    }
                }
            });
    }

    public ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
    }

    public onLogout(): void {
        this.authService.logout();
    }

    public isLoginShown(): boolean {
        return !this.isAuthPage && !this.isUserAuthenticated;
    }

    public isLogoutShown(): boolean {
        return this.isUserAuthenticated;
    }
}
