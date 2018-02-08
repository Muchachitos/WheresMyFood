import { MealModel } from "./meal/meal.model";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "../../app.config";
import { MealsLocalStorageService } from "./meals-local-storage.service";
import 'rxjs/Rx';

@Injectable()
export class MealsListService {
    private headers: Headers;

    constructor(private http: Http, private storageService: MealsLocalStorageService) {
        this.headers = new Headers();
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
    }

    getMeals(pageNumber: number, itemsToTake: number): Observable<MealModel[]> {
        const array = this.storageService.getArrayByPage(pageNumber);
        if (array.length > 0) return Observable.of(array);

        return this
            .http
            .get(`${AppConfig.apiUrl}/data/meals?pageNumber=${pageNumber}&toTake=${itemsToTake}`, { headers: this.headers })
            .map((response: Response) => {
                this.storageService.addToList(pageNumber, response.json());
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }
}
