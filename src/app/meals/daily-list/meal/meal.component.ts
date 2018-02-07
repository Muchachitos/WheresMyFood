import { Component, Input, EventEmitter } from "@angular/core";
import { MealModel } from "./meal.model";
import { DailyMealListService } from "../daily-meal-list.service";
import { OrdersService } from "../../../orders/orders.service";

@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.css']
})

export class MealComponent {
    @Input() item: MealModel;
    @Input() canMakeOrder: boolean;

    constructor(private ordersService: OrdersService) { }

    order(item: MealModel) {
        this.ordersService.order({ mealId: item.Id, userId: 1 });
    }

    cancel(item: MealModel) {
        this.ordersService.cancel({ mealId: item.Id, userId: 1 });
    }
}