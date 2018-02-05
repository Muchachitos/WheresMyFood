import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DailyMealListComponent } from './meals/daily-list/daily-meal-list.component';
import { MealComponent } from './meals/daily-list/meal/meal.component';
import { MealDetailComponent } from './meals/daily-list/meal-detail/meal-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { SignInComponent } from './auth/signIn/signIn.component';
import { SignUpComponent } from "./auth/signUp/signUp.component";

import { NotFoundComponent } from './common/components/404/page-not-found.component';
import { AppPaginationComponent } from './common/components/pagination/pagination.component';

import { ConditionalClassDirective } from './common/directives/conditional-class.directive';
import { ScrollStopDirective } from './common/directives/stop-scroll.directive';

import { LoggingService } from './common/services/logging.service';
import { AuthService } from './auth/auth.service';
import { DailyMealListService } from './meals/daily-list/daily-meal-list.service';
import { MealDetailResolverService } from './meals/daily-list/meal-detail/meal-detail-resolver.service';
import { AuthGuardService } from './auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DailyMealListComponent,
    MealComponent,
    MealDetailComponent,
    OrdersComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    AppPaginationComponent,

    ConditionalClassDirective,
    ScrollStopDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoggingService,
    AuthService,
    AuthGuardService,
    DailyMealListService,
    MealDetailResolverService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
