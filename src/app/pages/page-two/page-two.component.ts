import { Component, OnInit } from '@angular/core';
import { UserActivityService } from '../../services/user-activity.service';

@Component({
    selector: 'app-page-two',
    templateUrl: './page-two.component.html',
    styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {
    constructor(
        private userActivityService: UserActivityService
    ) { }

    ngOnInit(): void {
        this.userActivityService.updateTimer('page-two');
    }
}
