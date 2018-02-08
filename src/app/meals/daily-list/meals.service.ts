import { MealModel } from "./meal/meal.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "../../app.config";
import { MealsLocalStorageService } from "./meals-local-storage.service";
import 'rxjs/Rx';

@Injectable()
export class MealsListService {
    constructor(private httpClient: HttpClient, private storageService: MealsLocalStorageService) { }

    getMeals(pageNumber: number, itemsToTake: number): Observable<MealModel[]> {
        const array = this.storageService.getArrayByPage(pageNumber);
        if (array.length > 0) return Observable.of(array);

        return this
            .httpClient
            .get<any>(`${AppConfig.apiUrl}/data/meals?pageNumber=${pageNumber}&toTake=${itemsToTake}`, { observe: 'body' })
            .map(data => {
                this.storageService.addToList(pageNumber, data);
                return data;
            })
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }
}
