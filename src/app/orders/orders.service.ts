import { Injectable } from "@angular/core";
import { DailyMealLocalStorageService } from "../meals/daily-list/daily-meal-local-storage.service";

@Injectable()
export class OrdersService {
    constructor(private mealStorageService: DailyMealLocalStorageService) { }

    public order(obj: { mealId: number, userId: number }) {
        this.mealStorageService.markMealOrdered(obj.mealId);
    }

    public cancel(obj: { mealId: number, userId: number }) {
        this.mealStorageService.unmarkMealOrdered(obj.mealId);
    }
}