import { Component, OnInit, OnDestroy } from "@angular/core";
import { MealDetailModel } from "./meal-detail.model";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.css']
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