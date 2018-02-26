import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';

import { OrdersService } from "../../../orders/orders.service";
import { MealModel } from "./meal.model";
import { HttpErrorResponse } from "@angular/common/http";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
    selector: 'app-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.css'],
    animations: [
        trigger('orderAnimateButton', [
            transition('void => *', [
                animate('0.2s 0.1s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateX(-50%)', offset: 0 }),
                    style({ opacity: 0.5, transform: 'translateX(15px)', offset: 0.7 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate('0.2s ease-out', keyframes([
                    style({ opacity: 1, transform: 'translateX(-10px)', offset: 0 }),
                    style({ opacity: 0.8, transform: 'translateX(0px) scale(0.5)', offset: 0.5 }),
                    style({ opacity: 0.3, transform: 'translateX(5px) scale(0.3)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(0) scale(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('heartAnimation', [
            state('true', style({
                fontSize: '1.1em',
                transition: 'background-color .3s',
                color: '#eb626d'
            })),
            transition('true => false', [
                animate('0.2s 0.1s ease-in', keyframes([
                    style({ transform: 'translateX(0) scale(1.2)', offset: 0 }),
                    style({ transform: 'translateX(0) scale(0.8)', offset: 0.3 }),
                    style({ transform: 'translateX(0) scale(1)', offset: 1.0 })
                ]))
            ]),
            state('false', style({
                fontSize: '1.1em',
                transition: 'background-color .3s',
                color: 'rgb(153, 153, 153)'
            })),
            transition('false => true', [
                animate('0.2s 0.1s ease-in', keyframes([
                    style({ transform: 'translateX(0) scale(0.8)', offset: 0 }),
                    style({ transform: 'translateX(0) scale(1.2)', offset: 0.4 }),
                    style({ transform: 'translateX(0) scale(1)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class MealComponent {
    @Input() item: MealModel;
    @Input() canMakeOrder: boolean;
    @Input() isUserLoggedIn: boolean;

    constructor(private ordersService: OrdersService,
        private router: Router,
        private alertService: AlertService) { }

    order(item: MealModel) {
        if (!this.isUserLoggedIn) {
            this.router.navigate(['/auth/signin']);
            return;
        }
        this.ordersService.order({ mealId: item.id })
            .subscribe(
                () => { },
                (response: HttpErrorResponse) => { this.alertService.error(response.error); });
    }

    cancel(item: MealModel) {
        this.ordersService.cancelByMeal(item.id)
            .subscribe(
                () => { },
                (response: HttpErrorResponse) => { this.alertService.error(response.error); });
    }
}