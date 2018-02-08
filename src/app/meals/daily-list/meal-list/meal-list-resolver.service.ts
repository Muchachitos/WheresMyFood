import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { MealsListService } from "../meals.service";
import { MealsLocalStorageService } from "../meals-local-storage.service";

import { MealModel } from "../meal/meal.model";
import { MealsListMetaModel } from "./meal-list-meta.model";
import { AppConfig } from "../../../app.config";

@Injectable()
export class MealListResolverService implements Resolve<MealModel[]> {
    constructor(private dailyMealListService: MealsListService, private storageService: MealsLocalStorageService, private http: Http) { }

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