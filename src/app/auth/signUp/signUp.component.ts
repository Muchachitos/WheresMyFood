import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-signUp',
    templateUrl: './signUp.component.html'
})

export class SignUpComponent implements OnInit {
    private signupForm: FormGroup;

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signupForm.controls);
    }
}