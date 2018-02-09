import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { trigger, transition, keyframes, style, animate } from '@angular/animations';

import { MealsListService } from "../meals.service";
import { MealsLocalStorageService } from "../meals-local-storage.service";
import { AuthService } from "../../../auth/auth.service";

import { PaginationModel } from "../../../shared/components/pagination/pagination.model";
import { MealModel } from "../meal/meal.model";
import { MealsListMetaModel } from "./meal-list-meta.model";

@Component({
    selector: 'app-meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css'],
    animations: [
        trigger('mealCardAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateX(-40%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateX(-20%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateX(-10%)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(10px)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                style({ height: 0, width: 0, opacity: 0, visibility: 'hidden' }),
                animate('0.3s ease-out', keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 0.4, transform: 'translateX(-15px)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
    // if we add service to the providers here each time the component is created it will have new service
    // to avoid that if we only need one instace than we register that service in app.module
})

export class MealListComponent implements OnInit, OnDestroy {
    private list: MealModel[];
    private meta: MealsListMetaModel;
    private canMakeOrder: boolean;
    private currentPage: number;
    private isUserLoggedIn: boolean;

    private mealServiceListSubscription: Subscription;
    private routeDataSubscription: Subscription;
    private loginSubscription: Subscription;

    constructor(private mealsService: MealsListService, private mealStorage: MealsLocalStorageService, private route: ActivatedRoute, private authService: AuthService) {
        this.list = [];
        this.currentPage = 1;
        this.isUserLoggedIn = this.authService.isAuthenticated();
        this.meta = this.mealStorage.getMeta();
    }

    onPageChange(model: PaginationModel) {
        this.mealsService
            .getMeals(model.currentPage, this.meta.numberOfItemsToShow)
            .toPromise()
            .then((list: MealModel[]) => {
                this.list = list;
            });
    }

    ngOnInit(): void {
        this.routeDataSubscription =
            this.route
                .data
                .subscribe((data: Data) => {
                    this.list = data['mealListModel'];
                    this.canMakeOrder = this.list.find(x => x.isOrdered == true) == undefined;
                });

        this.mealServiceListSubscription =
            this.mealStorage
                .getMealList()
                .subscribe((meals: MealModel[]) => {
                    this.list = meals;
                    this.canMakeOrder = this.list.find(x => x.isOrdered == true) == undefined;
                });

        this.loginSubscription =
            this.authService
                .onUserLoggedIn()
                .subscribe(user => this.isUserLoggedIn = user != null);
    }

    ngOnDestroy(): void {
        if (!!this.mealServiceListSubscription)
            this.mealServiceListSubscription.unsubscribe();
        if (!!this.routeDataSubscription)
            this.routeDataSubscription.unsubscribe();
        if (!!this.loginSubscription)
            this.loginSubscription.unsubscribe();
    }
}