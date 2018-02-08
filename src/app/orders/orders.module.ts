import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { OrderListComponent } from "./order-list/order-list.component";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
    imports: [
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [
        OrderListComponent
    ]
})

export class OrdersModule { }