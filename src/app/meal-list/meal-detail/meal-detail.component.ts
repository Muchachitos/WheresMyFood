import { Component, OnInit } from "@angular/core";
import { MealDetailModel } from "./meal-detail.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html'
})

export class MealDetailComponent implements OnInit {
    private item: MealDetailModel;

    constructor(private route: ActivatedRoute) {
        this.item = new MealDetailModel();

        this.item = {
            Id: 1,
            Name: 'Some name 1',
            Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
            IsOrdered: false
        };
    }

    ngOnInit(): void {
        this.item.Id = this.route.snapshot.params['id'];
        // calling a service to fetch data for detail model
    }
}