import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
    public sessionsDurationInMinutes = {
        'page-one': 0,
        'page-two': 0,
        'page-three': 0,
        'total': 0
    };

    public statisticsTableData: {page: string, duration: number}[] = [];
    public displayedColumns: string[] = ['page', 'duration'];

    private _user: UserModel;
    private userSubscription: Subscription;

    private pageNames = {
        'page-one': 'Page 1',
        'page-two': 'Page 2',
        'page-three': 'Page 3',
        'total': 'Total'
    };

    public get user(): UserModel {
        return this._user;
    }

    constructor(
        private userService: UserService
    ) {}

    public ngOnInit(): void {
        this.userSubscription = this.userService.currentUser
            .subscribe(user => {
                this._user = user;
            });

        this.fillSessionsStatistics();
    }

    public ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
        this.userService.setCurrentUser(null);
    }

    private fillSessionsStatistics(): void {
        const sessionsDataFromLocalStorage = Object.entries(localStorage);
        this.mapSessions(sessionsDataFromLocalStorage);
        this.fillTable();
    }

    private mapSessions(sessionData): void {
        sessionData.forEach(element => {
            const session = JSON.parse(element[1]);

            if (session.pageName) {
                this.sessionsDurationInMinutes[session.pageName] += (session.sessionDuration);
                this.sessionsDurationInMinutes['total'] += (session.sessionDuration);
            }
        });
    }

    private fillTable(): void {
        Object.keys(this.sessionsDurationInMinutes).forEach(key => {
            this.statisticsTableData.push({
                page: this.pageNames[key],
                duration: this.sessionsDurationInMinutes[key]
            });
        });
    }
}
