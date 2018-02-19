import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { CommonModule } from "@angular/common";

import { LoggingService } from "../shared/services/logging.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuardService } from "../auth/auth-guard.service";
import { MealsListService } from "../meals/daily-list/meals.service";
import { MealsLocalStorageService } from "../meals/daily-list/meals-local-storage.service";
import { OrdersService } from "../orders/orders.service";
import { AlertService } from "../shared/services/alert.service";
import { AccountService } from "../auth/account/account.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/interceptors/auth.interceptor";
import { SignalRService } from "../shared/services/signalR.service";

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    providers: [
        LoggingService,
        AuthService,
        AuthGuardService,
        MealsListService,
        MealsLocalStorageService,
        OrdersService,
        AlertService,
        AccountService,
        SignalRService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ]
})
export class CoreModule { }