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
            .get<Account[]>(`${AppConfig.apiUrl}/user`)
            .map(data => data);
    }

    getById(id: string) {
        return this
            .httpClient
            .get<Account>(`${AppConfig.apiUrl}/user/${id}`)
            .map(data => data);
    }

    update(user: Account) {
        return this
            .httpClient
            .put(`${AppConfig.apiUrl}/user/${user.id}`, user);
    }

    delete(id: number) {
        return this
            .httpClient
            .delete(`${AppConfig.apiUrl}/user/${id}`);
    }
}