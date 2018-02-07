import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { MealDetailModel, OrderList } from "./meal-detail.model";

export class MealDetailResolverService implements Resolve<MealDetailModel>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealDetailModel> | Promise<MealDetailModel> | MealDetailModel {
        let id = +route.params['id']; // + is used for casting to integer

        // call web api
        let model: MealDetailModel = {
            Id: id,
            Name: 'Some name 1',
            Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
            IsOrdered: false,
            OrderList: [{
                Firstname: 'Mika',
                Lastname: 'Mikic',
                HasOrdered: false,
                LastTimeOrdered: new Date(2018, 1, 20)
            },
            {
                Firstname: 'Pera',
                Lastname: 'Peric',
                HasOrdered: true,
                LastTimeOrdered: new Date(2018, 1, 25)
            },
            {
                Firstname: 'Zuca',
                Lastname: 'Zutic',
                HasOrdered: false,
                LastTimeOrdered: new Date(2018, 1, 23)
            }]
        };

        return model;
    }
}