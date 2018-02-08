import { Component, ElementRef, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AlertService } from "../../shared/services/alert.service";

@Component({
    selector: 'app-signIn',
    templateUrl: './signIn.component.html'
})

export class SignInComponent implements OnInit {
    private returnUrl: string;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService) { }

    private cancel() {
        this.router.navigate(['/']);
    }

    private onSubmit(form: NgForm) {
        this.authService.login(form.controls.email.value, form.controls.password.value)
            .subscribe((status: number) => {
                if (status == 200) {
                    this.router.navigate([this.returnUrl]);
                }
            }, (error: Response) => {
                if (error.status == 401) {
                    this.alertService.error('Email does not exist or is already taken.');
                }
                else if (error.status == 500) {
                    this.alertService.error('We are having issues with our server currently please try again later.');
                }
                else {
                    this.alertService.error(error.statusText);
                }
            });
    }

    ngOnInit(): void {
        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}