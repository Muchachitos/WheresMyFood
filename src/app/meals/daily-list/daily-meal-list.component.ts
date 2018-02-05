import { Component, SimpleChanges, OnInit } from "@angular/core";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Event, ActivatedRoute, Data } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { PaginationModel } from "../../common/components/pagination/pagination.model";


@Component({
    selector: 'app-daily-meal-list',
    templateUrl: './daily-meal-list.component.html',
    styleUrls: ['./daily-meal-list.component.css']
    // if we add service to the providers here each time the component is created it will have new service
    // to avoid that if we only need one instace than we register that service in app.module
})

export class DailyMealListComponent implements OnInit {
    private list: MealModel[] = [];
    private meta: MealsListMetaModel;
    private pagesIndexes: number[] = [];
    private canMakeOrder: boolean;
    private currentPage: number = 1;

    constructor(private mealsService: DailyMealListService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.meta = this.mealsService.getMetaForMeals();

        this.route.data.subscribe((data: Data) => {
            this.list = data['mealListModel'];
            this.canMakeOrder = this.list.find(x => x.IsOrdered == true) == undefined;
        });

        this.mealsService
            .mealListChanged
            .subscribe((meals: MealModel[]) => {
                this.list = meals;
                this.canMakeOrder = this.list.find(x => x.IsOrdered == true) == undefined;
            });
    }

    onPageChange(model: PaginationModel) {
        this.list = this.mealsService.getMeals(model.currentPage, this.meta.numberOfItemsToShow);
    }
}