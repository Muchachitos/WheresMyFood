import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../auth/auth-guard.service";
import { OrderListComponent } from "./order-list/order-list.component";


const ordersRoutes: Routes = [
    { path: 'orders', component: OrderListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        RouterModule.forChild(ordersRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OrdersRoutingModule {

}