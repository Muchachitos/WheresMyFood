import { MealModel } from "./meal/meal.model";
import { Injectable } from "@angular/core";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { DailyMealLocalStorageService } from "./daily-meal-local-storage.service";
import 'rxjs/Rx';

@Injectable()
export class DailyMealListService {
    private headers: Headers;

    constructor(private http: Http, private storageService: DailyMealLocalStorageService) {
        this.headers = new Headers();
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
    }

    getMetaForMeals(): Observable<MealsListMetaModel> {
        const meta = this.storageService.getMeta();
        if (meta != undefined) return Observable.of(meta);

        return this
            .http
            .get('http://localhost:55405/api/data/meals/meta')
            .map((response: Response) => {
                this.storageService.setMeta(response.json());
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }

    getMeals(pageNumber: number, itemsToTake: number): Observable<MealModel[]> {
        const array = this.storageService.getArrayByPage(pageNumber);

        if (array.length > 0) return Observable.of(array);

        return this
            .http
            .get(`http://localhost:55405/api/data/meals?pageNumber=${pageNumber}&toTake=${itemsToTake}`, { headers: this.headers })
            .map((response: Response) => {
                this.storageService.addToList(pageNumber, response.json());
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }

    // move to orders.service
    order(meal: MealModel) {
        // ToDo: call webapi service
        if (meal != undefined || meal.Id > 0) {
            this.storageService.markMealOrdered(meal.Id);
        }
    }

    // move to orders.service
    cancel(meal: MealModel) {
        // ToDo: call webapi service
        if (meal != undefined || meal.Id > 0) {
            this.storageService.unmarkMealOrdered(meal.Id);
        }
    }
}
