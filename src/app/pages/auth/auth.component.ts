import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
    public loginFormGroup: FormGroup;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    public onSubmitForm() {
        const username = this.loginFormGroup.value.username;
        const password = this.loginFormGroup.value.password;
        const user = {
            username,
            password
        };

        if (this.authService.isUserValid(user)) {
            this.userService.setCurrentUser(user);

            this.router.navigate(['']);
        }
    }

    private initForm(): void {
        this.loginFormGroup = this.formBuilder.group({
            username: [''],
            password: [''],
        });
    }
}
