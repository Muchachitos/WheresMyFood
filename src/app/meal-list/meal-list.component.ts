import { Component, SimpleChanges, OnInit } from "@angular/core";
import { MealModel } from "./meal/meal.model";
import { MealsService } from "./meals.service";
import { Event } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";
import { MealsListMetaModel } from "./meals-list-meta.model";
import { PaginationModel } from "../common/components/pagination/pagination.model";


@Component({
    selector: 'app-meal-list',
    templateUrl: './meal-list.component.html',
    providers: [MealsService]
})

export class MealListComponent implements OnInit{
    private list: MealModel[] = [];
    private meta: MealsListMetaModel; 
    private pagesIndexes: number[] = [];
    private canMakeOrder: boolean;
    private currentPage: number = 1;
    
    constructor(private mealsService: MealsService) { }
    
    ngOnInit(): void {
        this.meta = this.mealsService.getMealsMeta();
        this.list = this.mealsService.getMeals(1,this.meta.numberOfItemsToShow);
        
        this.canMakeOrder = this.list.find(x=>x.IsOrdered == true) == undefined;
        
        this.mealsService
            .mealListChanged
            .subscribe((meals: MealModel[]) => 
                        {
                            this.list = meals;
                            this.canMakeOrder = this.list.find(x=>x.IsOrdered == true) == undefined;
                        });
    }

    onPageChange(model: PaginationModel){
        this.list = this.mealsService.getMeals(model.currentPage, this.meta.numberOfItemsToShow);
    }
}