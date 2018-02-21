import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MealDetailModel } from "./meal-detail.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../../../app.config";
import { Injectable } from "@angular/core";

@Injectable()
export class MealDetailResolverService implements Resolve<MealDetailModel>{
    constructor(private httpClient: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MealDetailModel> | Promise<MealDetailModel> | MealDetailModel {
        let id = +route.params['id']; // + is used for casting to integer

        return new Promise((resolve, reject) =>
            resolve(this
                .httpClient
                .get<MealDetailModel>(`${AppConfig.apiUrl}/data/meals/${id}`)
                .map(data => data)
                .catch(error => Observable.of(error))
                .toPromise()));
    }
}