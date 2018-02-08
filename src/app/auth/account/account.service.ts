import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "./account.model";
import { AppConfig } from "../../app.config";

@Injectable()
export class AccountService {
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this
            .httpClient
            .get<Account[]>(`${AppConfig.apiUrl}/account`)
            .map(data => data);
    }

    getById(id: string) {
        return this
            .httpClient
            .get<Account>(`${AppConfig.apiUrl}/account/${id}`)
            .map(data => data);
    }

    create(user: Account) {
        return this
            .httpClient
            .post(`${AppConfig.apiUrl}/account/register`, user);
    }

    update(user: Account) {
        return this
            .httpClient
            .put(`${AppConfig.apiUrl}/account/${user.id}`, user);
    }

    delete(id: number) {
        return this
            .httpClient
            .delete(`${AppConfig.apiUrl}/account/${id}`);
    }
}