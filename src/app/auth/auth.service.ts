import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    private loggedIn = false;

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    register() {
    }

    isAuthenticated() {
        return this.loggedIn;
    }

    delete() {
    }

    update() {
    }
}