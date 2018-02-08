import { Subject } from "rxjs/Subject";
import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { MealsListMetaModel } from "./meal-list/meal-list-meta.model";
import { MealModel } from "./meal/meal.model";

export class MealsLocalStorageService implements OnDestroy {
    private internalList: { pageNumber: number, onCurrentPage: boolean, array: MealModel[] }[];
    private meta: MealsListMetaModel;
    private mealList: Subject<MealModel[]>;

    constructor() {
        this.internalList = [];
        this.mealList = new Subject();
    }

    public markMealOrdered(mealId: number) {
        this.internalList
            .forEach(m => {
                m.array.forEach(element => {
                    if (element.id == mealId) {
                        element.isOrdered = true;
                        element.numberOfOrders++;
                    }
                    else {
                        element.isOrdered = false;
                    }
                });
            });
        this.mealList.next(this.internalList.find(x => x.onCurrentPage).array);
    }

    public unmarkMealOrdered(mealId: number) {
        this.internalList.forEach(m => {
            m.array.forEach(element => {
                element.isOrdered = false;
                if (mealId == element.id) {
                    element.numberOfOrders--;
                }
            });
        });
        this.mealList.next(this.internalList.find(x => x.onCurrentPage).array);
    }

    public setMeta(meta: MealsListMetaModel) {
        this.meta = meta;
    }

    public getMeta() {
        return this.meta;
    }

    public getMealList(): Observable<MealModel[]> {
        return this.mealList.asObservable();
    }

    public addToList(pageNumber: number, array: MealModel[]) {
        const pageListIndex = this.internalList.findIndex(x => x.pageNumber == pageNumber);

        if (pageListIndex == -1) {
            this.internalList.push({ pageNumber: pageNumber, onCurrentPage: true, array: array });
        } else {
            this.internalList[pageListIndex].array = array;
        }
    }

    public getArrayByPage(pageNumber: number): MealModel[] {
        const page = this.internalList.find(x => x.pageNumber == pageNumber);
        if (page != undefined) {
            this.internalList.forEach(x => {
                if (x.pageNumber == pageNumber) {
                    x.onCurrentPage = true;
                } else {
                    x.onCurrentPage = false;
                }
            })
            return page.array.slice();
        }
        return [];
    }

    ngOnDestroy(): void {
        if (!!this.mealList)
            this.mealList.unsubscribe();
    }
}