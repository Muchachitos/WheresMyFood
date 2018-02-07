import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { MealModel } from "./meal/meal.model";
import { Subject } from "rxjs/Subject";
import { OnDestroy } from "@angular/core";

export class DailyMealLocalStorageService implements OnDestroy {
    private internalList: { pageNumber: number, onCurrentPage: boolean, array: MealModel[] }[];
    private meta: MealsListMetaModel;
    public mealList: Subject<MealModel[]>;
    public mealMetaChanged: Subject<MealsListMetaModel>;

    constructor() {
        this.internalList = [];
        this.mealList = new Subject();
        this.mealMetaChanged = new Subject();
    }

    public markMealOrdered(mealId: number) {
        this.internalList
            .forEach(m => {
                m.array.forEach(element => {
                    if (element.Id == mealId) {
                        element.IsOrdered = true;
                        element.NumberOfOrders++;
                    }
                    else {
                        element.IsOrdered = false;
                    }
                });
            });
        this.mealList.next(this.internalList.find(x => x.onCurrentPage).array);
    }

    public unmarkMealOrdered(mealId: number) {
        this.internalList.forEach(m => {
            m.array.forEach(element => {
                element.IsOrdered = false;
                if (mealId == element.Id) {
                    element.NumberOfOrders--;
                }
            });
        });
        this.mealList.next(this.internalList.find(x => x.onCurrentPage).array);
    }

    public setMeta(meta: MealsListMetaModel) {
        this.meta = meta;
        this.mealMetaChanged.next(this.meta);
    }

    public getMeta() {
        return this.meta;
    }

    public addToList(pageNumber: number, array: MealModel[]) {
        const pageListIndex = this.internalList.findIndex(x => x.pageNumber == pageNumber);

        if (pageListIndex == -1) {
            this.internalList.push({ pageNumber: pageNumber, onCurrentPage: true, array: array });
        } else {
            this.internalList[pageListIndex].array = array;
        }
    }

    public getList() {
        return this.internalList.slice();
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
        if (!!this.mealMetaChanged)
            this.mealMetaChanged.unsubscribe();
    }
}