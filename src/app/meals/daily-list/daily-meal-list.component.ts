import { Component, SimpleChanges, OnInit } from "@angular/core";
import { MealModel } from "./meal/meal.model";
import { DailyMealListService } from "./daily-meal-list.service";
import { Event } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";
import { MealsListMetaModel } from "./daily-meal-list-meta.model";
import { PaginationModel } from "../../common/components/pagination/pagination.model";


@Component({
    selector: 'app-daily-meal-list',
    templateUrl: './daily-meal-list.component.html',
    styleUrls: ['./daily-meal-list.component.css'],
    providers: [DailyMealListService]
})

export class DailyMealListComponent implements OnInit {
    private list: MealModel[] = [];
    private meta: MealsListMetaModel;
    private pagesIndexes: number[] = [];
    private canMakeOrder: boolean;
    private currentPage: number = 1;

    constructor(private mealsService: DailyMealListService) { }

    ngOnInit(): void {
        this.meta = this.mealsService.getMealsMeta();
        this.list = this.mealsService.getMeals(1, this.meta.numberOfItemsToShow);

        this.canMakeOrder = this.list.find(x => x.IsOrdered == true) == undefined;

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