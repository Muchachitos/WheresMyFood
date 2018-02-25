import { Component, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { EmailValidator } from "@angular/forms/src/directives/validators";
import { AuthService } from "../auth.service";
import { AlertService } from "../../shared/services/alert.service";
import { Subscription, Observer } from "rxjs";
import { NotificationHubService } from "../../shared/services/hubs/notification-hub.service";

@Component({
    selector: 'app-signUp',
    templateUrl: './signUp.component.html'
})

export class SignUpComponent implements OnInit, OnDestroy {
    private signupForm: FormGroup;
    private userRegisteredSubscription: Subscription;

    constructor(private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private notificationHubService: NotificationHubService) { }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)]),
            confirmPassword: new FormControl(null, [Validators.required])
        }, {
                validators: this.validatePassword.bind(this)
            });

        this.userRegisteredSubscription =
            this.notificationHubService
                .onUserRegistered()
                .subscribe((userRegistered: boolean) => {
                    if (userRegistered) {
                        this.alertService.success('Registration succeeded!');
                        this.router.navigate(['/auth/signin']);
                    }
                }, data => {
                    for (let e in data.error) {
                        this.alertService.error(data.error[e]);
                    }
                });
    }

    ngOnDestroy(): void {
        if (!!this.userRegisteredSubscription)
            this.userRegisteredSubscription.unsubscribe();
    }

    private onSubmit() {
        if (!this.signupForm.valid) return;
        this.authService
            .register(
                {
                    firstName: this.signupForm.value.firstname,
                    lastName: this.signupForm.value.lastname,
                    email: this.signupForm.value.email,
                    password: this.signupForm.value.password
                })
            .subscribe((data: any) => {
            }, data => {
                for (let e in data.error) {
                    this.alertService.error(data.error[e]);
                }
            });
    }

    private cancel() {
        this.router.navigate(['/']);
    }

    private validatePassword(fromGroup: FormGroup): { [key: string]: any; } {
        if (fromGroup.controls['password'].value != fromGroup.controls['confirmPassword'].value) {
            return { invalidPass: true };
        }
        return null;
    }
}
