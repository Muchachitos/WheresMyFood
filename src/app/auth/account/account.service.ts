import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { AppConfig } from "../../app.config";
import { Account } from "./account.model";

@Injectable()
export class AccountService {
    constructor(private http: Http) { }

    getAll() {
        return this
            .http
            .get(`${AppConfig.apiUrl}/account`, this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: string) {
        return this
            .http
            .get(`${AppConfig.apiUrl}/account/${id}`, this.jwt())
            .map((response: Response) => response.json());
    }

    create(user: Account) {
        return this
            .http
            .post(`${AppConfig.apiUrl}/account/register`, user, this.jwt());
    }

    update(user: Account) {
        return this
            .http
            .put(`${AppConfig.apiUrl}/account/${user.Id}`, user, this.jwt());
    }

    delete(id: number) {
        return this
            .http
            .delete(`${AppConfig.apiUrl}/account/${id}`, this.jwt());
    }

    private jwt(): RequestOptions {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.Token) {
            let headers = new Headers({ 'Authorization': `Bearer ${currentUser.Token}` });
            return new RequestOptions({ headers: headers });
        }
    }
}