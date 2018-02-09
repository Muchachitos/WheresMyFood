import { Component, OnInit, OnDestroy } from "@angular/core";
import { MealDetailModel, UserOrder } from "./meal-detail.model";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import {
    trigger,
    transition,
    animate,
    keyframes,
    style,
    state
} from '@angular/animations';

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.css'],
    animations: [
        trigger('ordersListAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateY(-20%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateY(-10%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateY(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('descriptonAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateX(-20%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateX(-5%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateX(-2%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateX(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('orderButtonAnimation', [
            transition('true => false', [
                animate('0.1s ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateX(0) scale(1)', offset: 0 }),
                    style({ opacity: 0.5, transform: 'translateX(0) scale(0.4)', offset: 0.5 }),
                    style({ opacity: 0, transform: 'translateX(0) scale(0)', offset: 1.0 })
                ]))
            ]),
            transition('false => true', [
                animate('0.1s ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateX(0) scale(1)', offset: 0 }),
                    style({ opacity: 0.5, transform: 'translateX(0) scale(0.4)', offset: 0.5 }),
                    style({ opacity: 0, transform: 'translateX(0) scale(0)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class MealDetailComponent implements OnInit, OnDestroy {
    private item: MealDetailModel;
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    private orderForSomeone(userOrder: UserOrder, index: number) {
        console.log(index);
        const ind = this.item.orderList.findIndex(x => x.userId == userOrder.userId);
        if (!this.item.orderList[index].hasOrdered || (this.item.orderList[index].hasOrdered) && this.item.orderList[index].loggedInUserOrdered) {
            this.item.orderList[index].hasOrdered = !this.item.orderList[index].hasOrdered;
            this.item.orderList[index].loggedInUserOrdered = !this.item.orderList[index].loggedInUserOrdered;
        }
    }


    private order() {
        this.item.isOrdered = !this.item.isOrdered;
    }

    ngOnInit(): void {
        this.routeSubscription =
            this.route.data.subscribe((data: Data) => {
                this.item = data['detailModel'];
            });
    }

    ngOnDestroy(): void {
        if (!!this.routeSubscription)
            this.routeSubscription.unsubscribe();
    }
}