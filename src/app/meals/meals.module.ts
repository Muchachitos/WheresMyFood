import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MealsRoutingModule } from "./meals-routing.module";

import { MealDetailComponent } from "./daily-list/meal-detail/meal-detail.component";
import { MealComponent } from "./daily-list/meal/meal.component";
import { MealListComponent } from "./daily-list/meal-list/meal-list.component";
import { MealDetailResolverService } from "./daily-list/meal-detail/meal-detail-resolver.service";
import { MealListResolverService } from "./daily-list/meal-list/meal-list-resolver.service";

@NgModule({
    imports: [
        MealsRoutingModule,
        SharedModule
    ],
    declarations: [
        MealListComponent,
        MealComponent,
        MealDetailComponent
    ],
    providers: [
        MealDetailResolverService,
        MealListResolverService
    ]
})

export class MealsModule {

}