import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MealsModule } from './meals/meals.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';
import { AccountService } from './auth/account/account.service';

import { MealsListService } from './meals/daily-list/meals.service';
import { MealsLocalStorageService } from './meals/daily-list/meals-local-storage.service';

import { OrdersService } from './orders/orders.service';

import { AlertService } from './shared/services/alert.service';
import { LoggingService } from './shared/services/logging.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ToastModule.forRoot(),
    MealsModule,
    AuthModule,
    OrdersModule,
    SharedModule,
    AppRoutingModule // ako ima forRoot i forChild modul sa forRoot mora biti ovde poslednje naveden kako bi pre toga uvezao child putanje
  ],
  providers: [
    LoggingService,
    AuthService,
    MealsListService,
    MealsLocalStorageService,

    OrdersService,
    AlertService,
    AccountService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
