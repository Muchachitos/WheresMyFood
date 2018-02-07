import { Component, OnInit, OnDestroy } from "@angular/core";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Event, ActivatedRoute, Data } from "@angular/router";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { PaginationModel } from "../../common/components/pagination/pagination.model";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { DailyMealLocalStorageService } from "./daily-meal-local-storage.service";


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
    private currentPage: number = 1;

    private mealServiceListSubscription: Subscription;
    private routeDataSubscription: Subscription;

    constructor(private mealsService: DailyMealListService, private mealStorage: DailyMealLocalStorageService, private route: ActivatedRoute) {
        this.list = [];

        this.mealsService
            .getMetaForMeals()
            .toPromise()
            .then((meta: MealsListMetaModel) => {
                this.meta = meta;
            })
            .catch(error => {
                return 'error with getting meta for meals';
            });
    }

    ngOnInit(): void {
        this.routeDataSubscription =
            this.route
                .data
                .subscribe((data: Data) => {
                    this.list = data['mealListModel'];
                    this.canMakeOrder = this.list.find(x => x.IsOrdered == true) == undefined;
                });

        this.mealServiceListSubscription =
            this.mealStorage
                .mealList
                .subscribe((meals: MealModel[]) => {
                    this.list = meals;
                    this.canMakeOrder = this.list.find(x => x.IsOrdered == true) == undefined;
                });
    }

    onPageChange(model: PaginationModel) {
        this.mealsService
            .getMeals(model.currentPage, this.meta.NumberOfItemsToShow)
            .toPromise()
            .then((list: MealModel[]) => {
                this.list = list;
            });
    }

    ngOnDestroy(): void {
        if (!!this.mealServiceListSubscription)
            this.mealServiceListSubscription.unsubscribe();
        if (!!this.routeDataSubscription)
            this.routeDataSubscription.unsubscribe();
    }
}