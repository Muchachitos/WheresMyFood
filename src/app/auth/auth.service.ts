import { LoggingService } from "../common/services/logging.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    constructor(private loggingService: LoggingService) { }

    private loggedIn = false;

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    register() {
    }

    isAuthenticated(): Observable<boolean> {
        // web api
        return Observable.of(this.loggedIn);
    }

    delete() {
    }

    update() {
    }
}