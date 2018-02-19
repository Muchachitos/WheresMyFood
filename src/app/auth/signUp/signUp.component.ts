import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { EmailValidator } from "@angular/forms/src/directives/validators";
import { AccountService } from "../account/account.service";
import { AlertService } from "../../shared/services/alert.service";

@Component({
    selector: 'app-signUp',
    templateUrl: './signUp.component.html'
})

export class SignUpComponent implements OnInit {
    private signupForm: FormGroup;

    constructor(private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) { }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, [Validators.required, this.validatePassword.bind(this)])
        });
    }

    private onSubmit() {
        if (!this.signupForm.valid) return;
        this.accountService
            .create(
                {
                    id: 0,
                    firstName: this.signupForm.value.firstname,
                    lastName: this.signupForm.value.lastname,
                    email: this.signupForm.value.email,
                    password: this.signupForm.value.password
                })
            .subscribe((data: any) => {
                this.alertService.info('Registration sent');
                this.router.navigate(['/auth/signin']);
            }, data => {
                for (let e in data.error) {
                    this.alertService.error(data.error[e]);
                }
            });
    }

    private cancel() {
        this.router.navigate(['/']);
    }

    private validatePassword(control: AbstractControl): { [key: string]: any; } {
        if ((control.parent != undefined && control.parent.controls != undefined)
            && control.parent.controls['password'].value != control.value) {
            return { invalidPass: true };
        }
        return null;
    }
}
