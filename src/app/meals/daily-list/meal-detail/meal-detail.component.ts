import { Component, OnInit } from "@angular/core";
import { MealDetailModel } from "./meal-detail.model";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.css']
})

export class MealDetailComponent implements OnInit {
    private item: MealDetailModel;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.item = data['detailModel'];
        });
    }
}