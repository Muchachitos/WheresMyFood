import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DailyMealListComponent } from "./meals/daily-list/daily-meal-list.component";
import { MealDetailComponent } from "./meals/daily-list/meal-detail/meal-detail.component";
import { OrdersComponent } from "./orders/orders.component";
import { AuthComponent } from "./auth/auth.component";
import { SignInComponent } from "./auth/signIn/signIn.component";
import { SignUpComponent } from "./auth/signUp/signUp.component";

import { PageNotFoundComponent } from "./shared/components/404/page-not-found.component";

import { AuthGuardService } from "./auth/auth-guard.service";
import { MealDetailResolverService } from "./meals/daily-list/meal-detail/meal-detail-resolver.service";
import { DailyMealListResolverService } from "./meals/daily-list/daily-meal-list-resolver.service";

const appRoutes: Routes = [
    { path: '', component: DailyMealListComponent, resolve: { mealListModel: DailyMealListResolverService } },
    {
        path: 'auth', component: AuthComponent, children: [
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent }
        ]
    },
    { path: 'meal-list', component: DailyMealListComponent, resolve: { mealListModel: DailyMealListResolverService } },
    { path: 'meal-list/:id', canActivate: [AuthGuardService], component: MealDetailComponent, resolve: { detailModel: MealDetailResolverService } },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
    // needs to be last
    { path: '**', component: PageNotFoundComponent }
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