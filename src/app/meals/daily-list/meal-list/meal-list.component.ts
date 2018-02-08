import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { MealsListService } from "../meals.service";
import { MealsLocalStorageService } from "../meals-local-storage.service";
import { AuthService } from "../../../auth/auth.service";

import { PaginationModel } from "../../../shared/components/pagination/pagination.model";
import { MealModel } from "../meal/meal.model";
import { MealsListMetaModel } from "./meal-list-meta.model";

@Component({
    selector: 'app-meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css']
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