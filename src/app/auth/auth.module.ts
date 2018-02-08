import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./signIn/signIn.component";
import { SignUpComponent } from "./signUp/signUp.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,
        SignInComponent,
        SignUpComponent
    ]
})

export class AuthModule {

}