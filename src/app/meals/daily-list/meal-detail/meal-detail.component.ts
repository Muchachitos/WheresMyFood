import { Component, OnInit, OnDestroy } from "@angular/core";
import { MealDetailModel } from "./meal-detail.model";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import {
    trigger,
    transition,
    animate,
    keyframes,
    style
} from '@angular/animations';

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.css'],
    animations: [
        trigger('ordersListAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateY(-40%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateY(-20%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateY(-10%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateY(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(10px)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('descriptonAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateX(-10%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateX(-5%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateX(-2%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateX(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(10px)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class MealDetailComponent implements OnInit, OnDestroy {
    private item: MealDetailModel;
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute) { }

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