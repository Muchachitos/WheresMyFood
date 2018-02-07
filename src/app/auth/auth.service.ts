import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { AppConfig } from "../app.config";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
    private userSubject: Subject<{ firstName: string, lastName: string, email: string }>;

    constructor(private http: Http) {
        this.userSubject = new Subject<{ firstName: string, lastName: string, email: string }>();
    }

    login(email: string, password: string) {
        return this
            .http
            .post(`${AppConfig.apiUrl}/account/authenticate`, { email: email, password: password })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userSubject.next({ firstName: user.firstName, lastName: user.lastName, email: user.email });
                }
                return response.status;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') != null;
    }

    onUserLoggedIn(): Observable<{ firstName: string, lastName: string, email: string }> {
        return this.userSubject.asObservable();
    }
}