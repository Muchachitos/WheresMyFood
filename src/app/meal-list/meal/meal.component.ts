import { Component, Input, EventEmitter } from "@angular/core";
import { MealModel } from "./meal.model";
import { MealListService } from "../meal-list.service";

@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.css']
})

export class MealComponent {
    @Input() item: MealModel;
    @Input() canMakeOrder: boolean;

    private count: number = 0;

    constructor(private mealsService: MealListService) { }

    order(item: MealModel) {
        this.count += 1;
        this.mealsService.order(item);
    }

    cancel(item: MealModel) {
        this.mealsService.cancel(item);
        this.count -= 1;
    }
}