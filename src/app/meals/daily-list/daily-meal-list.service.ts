import { MealModel } from "./meal/meal.model";
import { Injectable, OnDestroy } from "@angular/core";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/Rx';

@Injectable()
export class DailyMealListService implements OnDestroy {
    private internalList: { pageNumber: number, onCurrentPage: boolean, array: MealModel[] }[];
    private meta: MealsListMetaModel;
    mealList: Subject<MealModel[]>;;

    constructor(private http: Http) {
        this.internalList = [];
        this.mealList = new Subject();
    }

    getMetaForMeals(): Observable<MealsListMetaModel> {
        if (this.meta != undefined) {
            return Observable.of(this.meta);
        }

        return this
            .http
            .get('http://localhost:55405/api/data/meals/meta')
            .map((response: Response) => {
                this.meta = response.json();
                return this.meta;
            });
    }

    getMeals(pageNumber: number, itemsToTake: number): Observable<MealModel[]> {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');

        let array = this.returnArrayIfPageExists(pageNumber);

        if (array.length > 0)
            return Observable.of(array);

        return this
            .http
            .get('http://localhost:55405/api/data/meals?pageNumber=' + pageNumber + '&toTake=' + itemsToTake, { headers: headers })
            .map((response: Response) => {
                let pageListIndex = this.internalList.findIndex(x => x.pageNumber == pageNumber);

                if (pageListIndex == -1) {
                    this.internalList.push({ pageNumber: pageNumber, onCurrentPage: true, array: response.json() });
                } else {
                    this.internalList[pageListIndex].array = response.json();
                }
                return response.json();
            });

    }

    order(meal: MealModel) {
        // ToDo: call webapi service
        let copy: MealModel[] = [];
        this.internalList.forEach(m => {
            m.array.forEach(element => {
                if (element.Id == meal.Id) {
                    element.IsOrdered = true;
                    element.NumberOfOrders++;
                }
                else {
                    element.IsOrdered = false;
                }
                if (m.onCurrentPage) {
                    copy.push(element);
                }
            });
        });
        this.mealList.next(copy);
    }

    cancel(meal: MealModel) {
        // ToDo: call webapi service
        let copy: MealModel[] = [];

        this.internalList.forEach(m => {
            m.array.forEach(element => {
                element.IsOrdered = false;
                if (meal.Id == element.Id) {
                    element.NumberOfOrders--;
                }
                if (m.onCurrentPage) {
                    copy.push(element);
                }
            });
        });
        this.mealList.next(copy);
    }

    ngOnDestroy(): void {
        this.mealList.unsubscribe();
    }

    private returnArrayIfPageExists(pageNumber: number): MealModel[] {
        let page = this.internalList.find(x => x.pageNumber == pageNumber);
        if (page != undefined) {
            this.internalList.forEach(x => {
                if (x.pageNumber == pageNumber) {
                    x.onCurrentPage = true;
                } else {
                    x.onCurrentPage = false;
                }
            })
            return page.array;
        }
        return [];
    }
}
