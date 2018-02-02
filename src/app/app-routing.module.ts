import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MealListComponent } from "./meal-list/meal-list.component";
import { MealDetailComponent } from "./meal-list/meal-detail/meal-detail.component";
import { OrdersComponent } from "./orders/orders.component";
import { AuthComponent } from "./auth/auth.component";

import { NotFoundComponent } from "./common/components/page-not-found.component";

import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: MealListComponent },
    { path: 'meal-list' , component: MealListComponent },
    { path: 'meal-list/:id',canActivate: [AuthGuardService] ,component: MealDetailComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'authentication', component: AuthComponent },
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