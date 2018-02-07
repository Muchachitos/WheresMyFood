import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnDestroy {
    private user: { firstName: string, lastName: string, email: string, }
    private loginSubscription: Subscription;

    constructor(private authService: AuthService) {
        this.user = this.authService.getUserData();

        this.loginSubscription =
            this.authService
                .onUserLoggedIn()
                .subscribe((user) => this.user = user);
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        if (!!this.loginSubscription)
            this.loginSubscription.unsubscribe();
    }
}