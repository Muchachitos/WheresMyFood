import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealDetailModel, OrderList } from "./meal-detail.model";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { AppConfig } from "../../../app.config";
import { Injectable } from "@angular/core";

@Injectable()
export class MealDetailResolverService implements Resolve<MealDetailModel>{
    constructor(private http: Http) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealDetailModel> | Promise<MealDetailModel> | MealDetailModel {
        let id = +route.params['id']; // + is used for casting to integer
        return new Promise((resolve, reject) =>
            resolve(this
                .http
                .get(`${AppConfig.apiUrl}/data/meals/${id}`)
                .map((response: Response) => response.json() as MealDetailModel)
                .toPromise()));
    }
}