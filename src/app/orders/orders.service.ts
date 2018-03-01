import { Injectable } from "@angular/core";
import { MealsLocalStorageService } from "../meals/daily-list/meals-local-storage.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AppConfig } from "../app.config";
import { OrderModel } from "./order/order.model";
import { AlertService } from "../shared/services/alert.service";
import { NotificationHubService } from "../shared/services/hubs/notification-hub.service";
import { AuthService } from "../auth/auth.service";
import { OrderAttemptsModel } from "./order/order-attempts.model";

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
            .subscribe((order: OrderModel) => {
                let isCurrentUser = this.authService.getCurrentUserId() == order.userId;
                if (isCurrentUser) {
                    this.alertService.success('Order created successfully!');
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

        this.notificationHubService
            .onOrderedAgain()
            .subscribe((order: OrderAttemptsModel) => {
                let isCurrentUser = this.authService.getCurrentUserId() == order.userId;
                if (isCurrentUser) {
                    if (order.attemptsLeft <= 0) {
                        this.alertService.success(`Order succeeded! You have no atttempts left.`);
                    } else {
                        this.alertService.success(`Order succeeded! You have ${order.attemptsLeft} attempts left in case you change your mind.`);
                    }
                }
                this.mealStorageService.markMealOrdered(order.mealId, isCurrentUser);
            });
    }

    public order(obj: { mealId: any, userId?: any }) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders`, { mealId: obj.mealId, userIdMadeChange: obj.userId });
    }

    public cancelByMeal(mealId: any) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders/cancel`, {});
    }

    public cancel(orderId: any) {
        return this.httpClient
            .post(`${AppConfig.apiUrl}/orders/id`, { id: orderId });
    }
}