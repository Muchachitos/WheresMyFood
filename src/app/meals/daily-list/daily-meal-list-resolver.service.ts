import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";

@Injectable()
export class DailyMealListResolverService implements Resolve<MealModel[]> {
    constructor(private dailyMealListService: DailyMealListService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealModel[]> | Promise<MealModel[]> | MealModel[] {
        return this.dailyMealListService.getMetaForMeals().switchMap((meta: MealsListMetaModel) => {
            return this.dailyMealListService.getMeals(1, meta.NumberOfItemsToShow);
        });
    }
}