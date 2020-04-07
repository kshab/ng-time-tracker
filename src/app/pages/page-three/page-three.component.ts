import { Component, OnInit } from '@angular/core';
import { UserActivityService } from 'src/app/services/user-activity.service';

@Component({
    selector: 'app-page-three',
    templateUrl: './page-three.component.html',
    styleUrls: ['./page-three.component.scss']
})
export class PageThreeComponent implements OnInit {
    constructor(
        private userActivityService: UserActivityService
    ) { }

    ngOnInit(): void {
        this.userActivityService.updateTimer('page-three');
    }
}
