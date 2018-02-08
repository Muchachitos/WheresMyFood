import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./shared/components/404/page-not-found.component";

const appRoutes: Routes = [
    // needs to be last
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) // samo jedan moze da postoji
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }