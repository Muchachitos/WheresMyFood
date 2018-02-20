import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AppConfig } from "../app.config";

@Injectable()
export class AuthService {
    private userSubject: Subject<{ firstName: string, lastName: string, email: string }>;

    constructor(private httpClient: HttpClient) {
        this.userSubject = new Subject<{ firstName: string, lastName: string, email: string }>();
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') != null;
    }

    getToken() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser != null ? currentUser.token.id : null;
    }

    login(email: string, password: string) {
        return this
            .httpClient
            .post(`${AppConfig.apiUrl}/account/authenticate`, { email: email, password: password }, { observe: 'response' })
            .map((response: HttpResponse<{ id: number, firstName: string, lastName: string, email: string, token: string }>) => {
                if (response && response.body && response.body.token) {
                    localStorage.setItem('currentUser', JSON.stringify(response.body));
                    this.userSubject.next({ firstName: response.body.firstName, lastName: response.body.lastName, email: response.body.email });
                }
                return response.status;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

    getLoggedInUserData(): { firstName: string, lastName: string, email: string } {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user != null) {
            return { firstName: user.firstName, lastName: user.lastName, email: user.email };
        }
        return null;
    }

    onUserLoggedIn(): Observable<{ firstName: string, lastName: string, email: string }> {
        return this.userSubject.asObservable();
    }
}