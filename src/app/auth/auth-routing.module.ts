import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./signIn/signIn.component";
import { SignUpComponent } from "./signUp/signUp.component";

const authRoutes: Routes = [
    {
        path: 'auth', component: AuthComponent, children: [
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }