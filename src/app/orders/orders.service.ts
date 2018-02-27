import { Injectable } from "@angular/core";
import { MealsLocalStorageService } from "../meals/daily-list/meals-local-storage.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AppConfig } from "../app.config";
import { OrderModel } from "./order/order.model";
import { AlertService } from "../shared/services/alert.service";
import { NotificationHubService } from "../shared/services/hubs/notification-hub.service";
import { AuthService } from "../auth/auth.service";
import { OrderCreatedModel } from "./order/order-created.model";

@Injectable()
export class OrdersService {
    constructor(
        private httpClient: HttpClient,
        private mealStorageService: MealsLocalStorageService,
        private notificationHubService: NotificationHubService,
        private alertService: AlertService,
        private authService: AuthService) {

        this.notificationHubService
            .onOrderCreated()
            .subscribe((order: OrderCreatedModel) => {
                let isCurrentUser = this.authService.getCurrentUserId() == order.userId;
                if (isCurrentUser) {
                    this.alertService.success('Order created successfully!');
                    if (order.attemptsLeft == 0) {
                        this.alertService.info(`You have not attempts left. If you cancel this order you will not be able to order again today.`);
                    } else {
                        this.alertService.info(`You have ${order.attemptsLeft} attempts left in case you change your mind.`);
                    }
                }
                this.mealStorageService.markMealOrdered(order.mealId, isCurrentUser);
            });

        this.notificationHubService
            .onOrderCanceled()
            .subscribe((order: OrderModel) => {
                let isCurrentUser = this.authService.getCurrentUserId() == order.userId;
                if (isCurrentUser) {
                    this.alertService.info('Order canceled!');
                }
                this.mealStorageService.unmarkMealOrdered(order.mealId, isCurrentUser);
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