import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-signIn',
    templateUrl: './signIn.component.html'
})

export class SignInComponent implements OnInit {

    constructor(private router: Router) { }

    private cancel() {
        this.router.navigate(['/']);
    }

    private onSubmit(form: NgForm) {
        console.log(form.value.email);
        console.log(form.value.password);
    }

    ngOnInit(): void {
    }
}