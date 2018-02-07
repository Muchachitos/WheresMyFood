import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { EmailValidator } from "@angular/forms/src/directives/validators";
import { AccountService } from "../account/account.service";
import { AlertService } from "../../common/services/alert.service";

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
        console.log(this.signupForm);
        if (!this.signupForm.valid) return;
        this.accountService
            .create(
            {
                Id: 0,
                FirstName: this.signupForm.value.firstname,
                LastName: this.signupForm.value.lastname,
                Email: this.signupForm.value.email,
                Password: this.signupForm.value.password
            })
            .subscribe(data => {
                this.alertService.success('Registration successful');
                this.router.navigate(['/auth/signin']);
            }, error => {
                this.alertService.error('Failed to register.');
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
