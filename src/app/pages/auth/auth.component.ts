import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
    public loginFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    public onSubmitForm() {
        this.router.navigate(['']);
    }

    private initForm(): void {
        this.loginFormGroup = this.formBuilder.group({
            username: [''],
            password: [''],
        });
    }
}
