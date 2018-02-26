import { Injectable } from "@angular/core";
import { MealsLocalStorageService } from "../meals/daily-list/meals-local-storage.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AppConfig } from "../app.config";
import { OrderModel } from "./order/order.model";
import { AlertService } from "../shared/services/alert.service";
import { NotificationHubService } from "../shared/services/hubs/notification-hub.service";

@Injectable()
export class OrdersService {
    constructor(
        private httpClient: HttpClient,
        private mealStorageService: MealsLocalStorageService,
        private notificationHubService: NotificationHubService,
        private alertService: AlertService) {

        this.notificationHubService.onOrderCreated().subscribe((order: OrderModel) => {
            this.mealStorageService.markMealOrdered(order.mealId);
            this.alertService.success('Meal ordered successfully!');
        });

        this.notificationHubService.onOrderCanceled().subscribe((order: OrderModel) => {
            this.mealStorageService.unmarkMealOrdered(order.mealId);
            this.alertService.info('Meal canceled!');
        });
    }

    public order(obj: { mealId: any, userId?: any }) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders`, { id: obj.mealId, userIdToBeOrdered: obj.userId });
    }

    public cancelByMeal(mealId: any) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders/meal`, { mealId: mealId });
    }

    public cancel(orderId: any) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders/id`, { id: orderId });
    }
}