import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ToastsManager } from "ng2-toastr/src/toast-manager";

@Injectable()
export class AlertService {

    constructor(private toastr: ToastsManager) { }

    success(message: string, title?: string) {
        this.toastr.success(message, title, { showCloseButton: true });
    }

    error(message: string, title?: string) {
        this.toastr.error(message, title, { showCloseButton: true });
    }

    warning(message: string, title?: string) {
        this.toastr.warning(message, title, { showCloseButton: true });
    }

    info(message: string, title?: string) {
        this.toastr.info(message, title, { showCloseButton: true });
    }

    custom(html: string) {
        this.toastr.custom(html, null, { enableHTML: true, showCloseButton: true });
    }
}