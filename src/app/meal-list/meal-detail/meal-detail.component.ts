import { Component, OnInit } from "@angular/core";
import { MealDetailModel } from "./meal-detail.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html'
})

export class MealDetailComponent implements OnInit{
    private item : MealDetailModel;
    
    constructor(private route: ActivatedRoute) {
        this.item = new MealDetailModel();
    }

    ngOnInit(): void {
        this.item.Id = this.route.snapshot.params['id'];
        // calling a service to fetch data for detail model
    }
}