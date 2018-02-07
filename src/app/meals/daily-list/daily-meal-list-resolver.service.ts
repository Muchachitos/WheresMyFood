import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { DailyMealLocalStorageService } from "./daily-meal-local-storage.service";
import { Http, Response } from "@angular/http";
import { AppConfig } from "../../app.config";

@Injectable()
export class DailyMealListResolverService implements Resolve<MealModel[]> {
    constructor(private dailyMealListService: DailyMealListService, private storageService: DailyMealLocalStorageService, private http: Http) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealModel[]> | Promise<MealModel[]> | MealModel[] {
        return new Promise<MealModel[]>((resolve, reject) => {
            let meta = this.storageService.getMeta();
            if (meta) {
                return resolve(this.dailyMealListService.getMeals(1, meta.numberOfItemsToShow).toPromise());
            } else {
                return this
                    .http
                    .get(`${AppConfig.apiUrl}/data/meals/meta`)
                    .toPromise()
                    .then((response: Response) => {
                        let meta = response.json() as MealsListMetaModel;

                        this.storageService.setMeta(meta);
                        resolve(this.dailyMealListService.getMeals(1, meta.numberOfItemsToShow).toPromise());
                    })
                    .catch(error => {
                        return error;
                    });
            }
        });
    }
}