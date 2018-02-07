import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { AppConfig } from "../app.config";

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        return this
            .http
            .post(`${AppConfig.apiUrl}/account/authenticate`, { email: email, password: password })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return response.status;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') != undefined;
    }
}