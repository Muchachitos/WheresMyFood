import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class DailyMealListResolverService implements Resolve<MealModel[]>{

    constructor(private dailyMealListService: DailyMealListService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MealModel[] | Observable<MealModel[]> | Promise<MealModel[]> {
        // observable
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let meta = this.dailyMealListService.getMetaForMeals();
                resolve(this.dailyMealListService.getMeals(1, meta.numberOfItemsToShow));
            }, 800);
        });
    }
}