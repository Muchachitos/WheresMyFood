import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaginationComponent } from "./components/pagination/pagination.component";
import { ScrollStopDirective } from "./directives/stop-scroll.directive";
import { ConditionalClassDirective } from "./directives/conditional-class.directive";
import { PageNotFoundComponent } from "./components/404/page-not-found.component";

@NgModule({
    id: module.id,
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent,
        PageNotFoundComponent,
        ConditionalClassDirective,
        ScrollStopDirective
    ],
    exports: [
        CommonModule,
        PaginationComponent,
        ConditionalClassDirective,
        ScrollStopDirective
    ]
})

export class SharedModule { }