import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal-list/meal/meal.component';
import { MealDetailComponent } from './meal-list/meal-detail/meal-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from './auth/auth.component';

import { NotFoundComponent } from './common/components/page-not-found.component';
import { AppPaginationComponent } from './common/components/pagination/pagination.component';

import { ConditionalClassDirective } from './common/directives/conditional-class.directive';
import { ScrollStopDirective } from './common/directives/stop-scroll.directive';

import { LoggingService } from './common/services/logging.service';
import { AuthService } from './auth/auth.service';
import { MealListService } from './meal-list/meal-list.service';
import { AuthGuardService } from './auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MealListComponent,
    MealComponent,
    MealDetailComponent,
    OrdersComponent,
    AuthComponent,
    NotFoundComponent,
    AppPaginationComponent,

    ConditionalClassDirective,
    ScrollStopDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoggingService,
    AuthService,
    AuthGuardService,
    MealListService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
