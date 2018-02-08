import { Component, Input, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { OrdersService } from "../../../orders/orders.service";
import { MealModel } from "./meal.model";

@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.css']
})

export class MealComponent {
    @Input() item: MealModel;
    @Input() canMakeOrder: boolean;
    @Input() isUserLoggedIn: boolean;

    constructor(private ordersService: OrdersService, private router: Router) { }

    order(item: MealModel) {
        if (!this.isUserLoggedIn) {
            this.router.navigate(['/auth/signin']);
            return;
        }
        this.ordersService.order({ mealId: item.id, userId: 1 });
    }

    cancel(item: MealModel) {
        this.ordersService.cancel({ mealId: item.id, userId: 1 });
    }
}