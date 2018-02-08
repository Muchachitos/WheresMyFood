import { Component, OnInit, OnDestroy } from "@angular/core";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { ActivatedRoute, Data } from "@angular/router";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { PaginationModel } from "../../shared/components/pagination/pagination.model";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { DailyMealLocalStorageService } from "./daily-meal-local-storage.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-daily-meal-list',
    templateUrl: './daily-meal-list.component.html',
    styleUrls: ['./daily-meal-list.component.css']
    // if we add service to the providers here each time the component is created it will have new service
    // to avoid that if we only need one instace than we register that service in app.module
})

export class DailyMealListComponent implements OnInit, OnDestroy {
    private list: MealModel[];
    private meta: MealsListMetaModel;
    private canMakeOrder: boolean;
    private currentPage: number;
    private isUserLoggedIn: boolean;

    private mealServiceListSubscription: Subscription;
    private routeDataSubscription: Subscription;
    private loginSubscription: Subscription;

    constructor(private mealsService: DailyMealListService, private mealStorage: DailyMealLocalStorageService, private route: ActivatedRoute, private authService: AuthService) {
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