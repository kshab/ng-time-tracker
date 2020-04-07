import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root",
})
export class UserActivityService {
    private inactivityTimer: any;
    private activityTimer: any;
    private sessionDuarationInSeconds = 1;
    public isTimerFrozen = false;

    private currentPage: string | null;
    private previousPage: string | null;

    constructor() { }

    public startSessionTimer(): void {
        this.activityTimer = setInterval(() => {
            console.log(this.sessionDuarationInSeconds);
            this.sessionDuarationInSeconds ++;
        }, 1000);
    }

    public stopSessionTimer(): void {
        clearInterval(this.activityTimer);
    }

    public resetSessionTimer() {
        this.stopSessionTimer();
        this.startSessionTimer();
    }

    public startInactivityTimer(): void {
        this.isTimerFrozen = false;
        this.stopInactivityTimer();
        this.inactivityTimer = setTimeout(() => {
            this.isTimerFrozen = true;
            this.stopSessionTimer();
        }, 10000); // set smaller delay in order to test faster
    }

    private stopInactivityTimer(): void {
        clearTimeout(this.inactivityTimer);
    }

    public updateTimer(page: string | null): void {
        this.stopSessionTimer();

        if (page) {
            this.currentPage = page;
        }

        if (this.previousPage) {
            this.savePageSessionInfoInLocalstorage(this.previousPage);
        }

        this.previousPage = this.currentPage;

        this.sessionDuarationInSeconds = 1;
        if (!this.isTimerFrozen) {
            this.startSessionTimer();
        }
    }

    private savePageSessionInfoInLocalstorage(page: string | null): void {
        const pageSessionId = Math.floor(Math.random() * 10000);

        localStorage.setItem(pageSessionId.toString(), JSON.stringify({
            pageName: page,
            sessionDuration: this.sessionDuarationInSeconds
        }));
    }
}
