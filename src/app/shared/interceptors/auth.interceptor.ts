import { HttpInterceptor, HttpHandler, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppConfig } from '../../app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': AppConfig.clientUrl,
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(req);
    }
}