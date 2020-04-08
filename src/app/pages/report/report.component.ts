import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    public sessionsDurationInMinutes = {
        'page-one': 0,
        'page-two': 0,
        'page-three': 0,
        'total': 0
    };

    public statisticsTableData: {page: string, duration: number}[] = [];
    public displayedColumns: string[] = ['page', 'duration'];

    private _user: UserModel;

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
        this.fillSessionsStatistics();
    }

    private fillSessionsStatistics(): void {
        const sessionsDataFromLocalStorage = Object.entries(localStorage);
        this.mapSessions(sessionsDataFromLocalStorage);
        this.fillTable();
    }

    private mapSessions(sessionData): void {
        sessionData.forEach(element => {
            const item = JSON.parse(element[1]);

            if (item.pageName) {
                this.sessionsDurationInMinutes[item.pageName] += (item.sessionDuration);
                this.sessionsDurationInMinutes['total'] += (item.sessionDuration);
            } else if (item.username) {
                this._user = item;
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
