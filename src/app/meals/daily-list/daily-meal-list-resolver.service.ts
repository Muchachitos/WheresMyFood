import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/first';

@Injectable()
export class DailyMealListResolverService implements Resolve<MealModel[]>{

    constructor(private dailyMealListService: DailyMealListService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealModel[]> | Promise<MealModel[]> | MealModel[] {
        // observable
        let meta = this.dailyMealListService.getMetaForMeals();
        return this.dailyMealListService.getMeals(1, meta.numberOfItemsToShow);
    }
}