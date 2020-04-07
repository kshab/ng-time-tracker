import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root",
})
export class UserActivityService {
    private inactivityTimer: any;
    private sessionStartTimeInMilliseconds = 0;
    private sessionEndTimeInMilliseconds = 0;
    private sessionDuarationInMilliseconds = 0;
    public isTimerFrozen = false;

    private currentPage: string | null;
    private previousPage: string | null;

    constructor() { }

    public startSessionTimer(): void {
        this.sessionStartTimeInMilliseconds = new Date().getTime();
    }

    public stopSessionTimer(): void {
        this.sessionEndTimeInMilliseconds = new Date().getTime();
        this.sessionDuarationInMilliseconds = this.sessionEndTimeInMilliseconds - this.sessionStartTimeInMilliseconds;
    }

    public startInactivityTimer(): void {
        this.inactivityTimer = setTimeout(() => {
            this.isTimerFrozen = true;
            this.updateTimer(null);
        }, 3000);
    }

    public stopInactivityTimer(): void {
        clearTimeout(this.inactivityTimer);
    }

    public updateTimer(page: string | null): void {
        if (this.currentPage || !page) {
            this.previousPage = this.currentPage;
            this.currentPage = page;

            this.stopSessionTimer();
            this.savePageSessionInfoInLocalstorage(this.previousPage);
        } else {
            this.currentPage = page;
            this.startSessionTimer();
        }

        if (!this.isTimerFrozen) {
            this.startSessionTimer();
        }
    }

    private savePageSessionInfoInLocalstorage(page: string | null): void {
        const pageSessionId = Math.floor(Math.random() * 10000);

        localStorage.setItem(pageSessionId.toString(), JSON.stringify({
            pageName: page,
            sessionDuration: this.sessionDuarationInMilliseconds
        }));
    }
}
