import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MealListComponent } from "./daily-list/meal-list/meal-list.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { MealListResolverService } from "./daily-list/meal-list/meal-list-resolver.service";
import { MealDetailComponent } from "./daily-list/meal-detail/meal-detail.component";
import { MealDetailResolverService } from "./daily-list/meal-detail/meal-detail-resolver.service";


const mealsRoutes: Routes = [
    { path: '', redirectTo: 'meal-list', pathMatch: 'full' },
    { path: 'meal-list', component: MealListComponent, resolve: { mealListModel: MealListResolverService } },
    { path: 'meal-list/:id', canActivate: [AuthGuardService], component: MealDetailComponent, resolve: { detailModel: MealDetailResolverService } }
];

@NgModule({
    imports: [
        RouterModule.forChild(mealsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MealsRoutingModule {

}