import {
    HttpInterceptor,
    HttpHandler,
    HttpHeaderResponse,
    HttpSentEvent,
    HttpProgressEvent,
    HttpResponse,
    HttpErrorResponse,
    HttpUserEvent,
    HttpRequest,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppConfig } from '../../app.config';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': AppConfig.clientUrl,
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(req)
            .do((event: HttpEvent<any>) => { },
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 401) {
                        this.router.navigate(['/auth/signin']);
                        this.alertService.warning('Token has expired. You have been logged out.');
                    }
                }
            });
    }
}