import { Injectable } from "@angular/core";
import { MealsLocalStorageService } from "../meals/daily-list/meals-local-storage.service";

@Injectable()
export class OrdersService {
    constructor(private mealStorageService: MealsLocalStorageService) { }

    public order(obj: { mealId: number, userId: number }) {
        this.mealStorageService.markMealOrdered(obj.mealId);
    }

    public cancel(obj: { mealId: number, userId: number }) {
        this.mealStorageService.unmarkMealOrdered(obj.mealId);
    }
}