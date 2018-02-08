import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { CoreModule } from './core/core.module';
import { MealsModule } from './meals/meals.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MealsModule,
    AuthModule,
    OrdersModule,
    SharedModule,
    CoreModule    // routing module koji u sebi ima putanju '*' mora da bude naveden kao poslednji routing modul u imports-ima
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
