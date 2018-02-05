import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DailyMealListComponent } from "./meals/daily-list/daily-meal-list.component";
import { MealDetailComponent } from "./meals/daily-list/meal-detail/meal-detail.component";
import { OrdersComponent } from "./orders/orders.component";
import { SignInComponent } from "./auth/signIn/signIn.component";
import { SignUpComponent } from "./auth/signUp/signUp.component";

import { NotFoundComponent } from "./common/components/404/page-not-found.component";

import { AuthGuardService } from "./auth/auth-guard.service";
import { MealDetailResolverService } from "./meals/daily-list/meal-detail/meal-detail-resolver.service";

const appRoutes: Routes = [
    { path: '', component: DailyMealListComponent },
    { path: 'meal-list', component: DailyMealListComponent },
    { path: 'meal-list/:id', canActivate: [AuthGuardService], component: MealDetailComponent, resolve: { detailModel: MealDetailResolverService } },
    { path: 'orders', component: OrdersComponent },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignUpComponent },
    // needs to be last
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}