import { Component, OnInit } from '@angular/core';
import { UserActivityService } from '../../services/user-activity.service';

@Component({
    selector: 'app-page-one',
    templateUrl: './page-one.component.html',
    styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {
    constructor(
        private userActivityService: UserActivityService
    ) {}

    ngOnInit(): void {
        this.userActivityService.updateTimer('page-one');
    }
}
