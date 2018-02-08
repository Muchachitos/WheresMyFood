import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MealListComponent } from './meals/daily-list/meal-list/meal-list.component';
import { MealComponent } from './meals/daily-list/meal/meal.component';
import { MealDetailComponent } from './meals/daily-list/meal-detail/meal-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/signIn/signIn.component';
import { SignUpComponent } from "./auth/signUp/signUp.component";

import { PageNotFoundComponent } from './shared/components/404/page-not-found.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';

import { ConditionalClassDirective } from './shared/directives/conditional-class.directive';
import { ScrollStopDirective } from './shared/directives/stop-scroll.directive';

import { LoggingService } from './shared/services/logging.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

import { MealsListService } from './meals/daily-list/meals.service';
import { MealDetailResolverService } from './meals/daily-list/meal-detail/meal-detail-resolver.service';
import { MealListResolverService } from './meals/daily-list/meal-list/meal-list-resolver.service';
import { MealsLocalStorageService } from './meals/daily-list/meals-local-storage.service';

import { OrdersService } from './orders/orders.service';

import { AlertService } from './shared/services/alert.service';
import { AccountService } from './auth/account/account.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MealListComponent,
    MealComponent,
    MealDetailComponent,
    OrdersComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    PaginationComponent,

    ConditionalClassDirective,
    ScrollStopDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule.forRoot()
  ],
  providers: [
    LoggingService,
    AuthService,
    AuthGuardService,
    MealsListService,
    MealDetailResolverService,
    MealListResolverService,
    MealsLocalStorageService,

    OrdersService,
    AlertService,
    AccountService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
