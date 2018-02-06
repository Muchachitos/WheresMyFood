import { MealModel } from "./meal/meal.model";
import { Injectable } from "@angular/core";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/Rx';

@Injectable()
export class DailyMealListService {
    mealList = new Subject();
    private list: MealModel[] = [];

    constructor(private http: Http) { }

    getMetaForMeals(): MealsListMetaModel {
        return new MealsListMetaModel(3, this.list.length, 5, 8);
    }

    getMeals(pageNumber: number, itemsToTake: number): Observable<MealModel[]> {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');

        return this.http
            .get('http://localhost:55405/api/data/meals?pageNumber=' + pageNumber + '&toTake=' + itemsToTake, { headers: headers })
            .map((response: Response) => {
                // optimization
                this.list = response.json();
                return response.json();
            });
    }

    order(meal: MealModel) {
        // ToDo: call webapi service
        this.list.forEach(m => {
            if (m.Id == meal.Id) {
                m.IsOrdered = true;
                m.NumberOfOrders++;
            }
            else
                m.IsOrdered = false;
        });
        this.mealList.next(this.list.slice());
    }

    cancel(meal: MealModel) {
        // ToDo: call webapi service
        this.list.forEach(m => {
            m.IsOrdered = false;
            if (meal.Id == m.Id)
                m.NumberOfOrders--;
        });
        this.mealList.next(this.list.slice());
    }
}