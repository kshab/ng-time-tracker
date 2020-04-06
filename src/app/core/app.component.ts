import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.addRegisteredUserToLocalStorage();
    this.authService.isUserExists({username: 'wer', password: 'qer'});
  }
}
